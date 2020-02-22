import escapeHtml from "escape-html";
import { jsx } from "slate-hyperscript";
import { Node, Text } from "slate";

export const serialize = node => {
  // const m = {};
  // let mm;
  if (Text.isText(node)) {
    //const m = { text: escapeHtml(node.text), attr:  };

    // if (node.text) {
    //   Object.assign(m, node);
    //   delete m.text;
    // }

    // console.log(node, "nodee", JSON.stringify(m).replace(/:/g, "="), "mmm");
    // mm = JSON.stringify(m).replace(/:/g, "=");
    const text = node.text;
    //console.log(node, "node");
    // switch (node) {
    //   case node.bold:
    //     return console.log(node.bold, "efwwfewfw");
    //   case "italic":
    //     return <em>{children}</em>;
    //   case "underline":
    //     return <u>{children}</u>;
    // }

    if (node.bold) return `<strong>${escapeHtml(node.text)}</strong>`;
    if (node.italic) return `<em>${escapeHtml(node.text)}</em>`;
    if (node.underline) return `<u>${escapeHtml(node.text)}</u>`;

    return escapeHtml(node.text);
  }
  //console.log(node, "node/-119");
  const children = node.children.map(n => serialize(n)).join("");
  //const children = node.children.map(n => serialize(n));
  //console.log(children, "children", node.type, "type");
  switch (node.type) {
    case "block-quote":
      return `<blockquote><p>${children}</p></blockquote>`;
    case "paragraph":
      return `<p>${children}</p>`;
    case "link":
      return `<a href="${escapeHtml(node.url)}">${children}</a>`;
    case "bulleted-list":
      return `<ul>${children}</ul>`;
    case "heading-one":
      return `<h1>${children}</h1>`;
    case "heading-two":
      return `<h2>${children}</h2>`;
    case "list-item":
      return `<li>${children}</li>`;
    case "numbered-list":
      return `<ol>${children}</ol>`;
    default:
      return children;
  }
};

export const deserialize = el => {
  console.log(el, "ELELEL");
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  }

  const children = Array.from(el.childNodes).map(deserialize);
  console.log(el.nodeName, "el.nodeName");
  switch (el.nodeName) {
    case "BODY":
      return jsx("fragment", {}, children);
    case "BR":
      return "\n";
    case "BLOCKQUOTE":
      return jsx("element", { type: "quote" }, children);
    case "P":
      return jsx("element", { type: "paragraph" }, children);
    case "H1":
      return jsx("element", { type: "heading-one" }, children);
    case "A":
      return jsx(
        "element",
        { type: "link", url: el.getAttribute("href") },
        children
      );
    default:
      return el.textContent;
  }
};
