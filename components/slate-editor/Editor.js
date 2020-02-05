// Import React dependencies.
import React, { useEffect, useMemo, useState, useCallback } from "react";
// Import the Slate editor factory.
import { createEditor, Editor, Transforms, Text } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

// Define a React component renderer for our code blocks.
const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = props => {
  return <b {...props.attributes}>{props.children}</b>;
};

const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};

const SlateEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  // Add the initial value when setting up our state.
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }]
    }
  ]);

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const onKeyDown = event => {
    if (!event.ctrlKey) {
      return;
    }

    switch (event.key) {
      // When "`" is pressed, keep our existing code block logic.
      case "x": {
        event.preventDefault();
        const [match] = Editor.nodes(editor, {
          match: n => n.type === "code"
        });
        Transforms.setNodes(
          editor,
          { type: match ? "paragraph" : "code" },
          { match: n => Editor.isBlock(editor, n) }
        );
        break;
      }

      // When "B" is pressed, bold the text in the selection.
      case "b": {
        event.preventDefault();
        const [match] = Editor.nodes(editor, {
          match: n => n.bold === true
        });
        Transforms.setNodes(
          editor,
          { bold: !match },
          // Apply it to text nodes, and split the text node up if the
          // selection is overlapping only part of it.
          { match: n => Text.isText(n), split: true }
        );
        break;
      }
    }
  };

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable
        renderElement={renderElement}
        // Pass in the `renderLeaf` function.
        renderLeaf={renderLeaf}
        // Define a new handler which prints the key that was pressed.
        onKeyDown={onKeyDown}
      />
    </Slate>
  );
};

export default SlateEditor;
