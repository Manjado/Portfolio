// Import React dependencies.
import React, { useEffect, useMemo, useState, useCallback } from "react";
// Import the Slate editor factory.
import { createEditor, Editor, Transforms, Text } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

import { withHistory } from "slate-history";

import HoverMenu from "./HoverMenu";
import ControlMenu from "./ControllMenu";
import initialValue from "./initial-value";
import { Element } from "./renderes";

import { serialize } from "./rules";

const SlateEditor = props => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  // Add the initial value when setting up our state.
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const renderElement = useCallback(props => <Element {...props} />, []);

  useEffect(() => {
    setLoading(false);
  }, []);

  const Leaf = ({ attributes, children, leaf }) => {
    console.log(leaf, "lll");
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }

    if (leaf.italic) {
      children = <em>{children}</em>;
    }

    if (leaf.underlined) {
      children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
  };

  const toggleFormat = (editor, format) => {
    const isActive = isFormatActive(editor, format);
    Transforms.setNodes(
      editor,
      { [format]: isActive ? null : true },
      { match: Text.isText, split: true }
    );
  };

  const isFormatActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
      match: n => n[format] === true,
      mode: "all"
    });
    return !!match;
  };

  const getTitle = () => {
    const [firstBlock, secondBlock] = value;
    const title =
      firstBlock && firstBlock.type === "heading-one"
        ? firstBlock.children[0].text
        : "No title";
    const subtitle =
      secondBlock && secondBlock.type === "heading-two"
        ? secondBlock.children[0].text
        : "No subtitle";
    return {
      title,
      subtitle
    };
  };

  const save = () => {
    const { save, isLoading } = props;
    const headingValues = getTitle();
    const text = serialize({ children: value });
    !isLoading && save(text, headingValues);
  };

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <ControlMenu save={save} isLoading={props.isLoading}></ControlMenu>
      {!loading && <HoverMenu />}
      <Editable
        renderElement={renderElement}
        renderLeaf={props => <Leaf {...props} />}
        placeholder="Enter some text..."
        onDOMBeforeInput={event => {
          switch (event.inputType) {
            case "formatBold":
              return toggleFormat(editor, "bold");
            case "formatItalic":
              return toggleFormat(editor, "italic");
            case "formatUnderline":
              return toggleFormat(editor, "underline");
          }
        }}
      />
    </Slate>
  );
};

export default SlateEditor;
