// Import React dependencies.
import React, { useEffect, useMemo, useState, useCallback } from "react";
// Import the Slate editor factory.
import { createEditor, Editor, Transforms } from "slate";

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
    if (event.key === "x" && event.ctrlKey) {
      event.preventDefault();
      // Determine whether any of the currently selected blocks are code blocks.
      const [match] = Editor.nodes(editor, {
        match: n => n.type === "code"
      });
      // Toggle the block type depending on whether there's already a match.
      Transforms.setNodes(
        editor,
        { type: match ? "paragraph" : "code" },
        { match: n => Editor.isBlock(editor, n) }
      );
    }
  };

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable
        renderElement={renderElement}
        // Define a new handler which prints the key that was pressed.
        onKeyDown={onKeyDown}
      />
    </Slate>
  );
};

export default SlateEditor;
