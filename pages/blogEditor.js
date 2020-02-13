import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import SlateEditor from "../components/slate-editor/Editor";
class BlogEditor extends React.Component {
  saveBlog = ({ title, subtitle }) => {
    const blog = {};
    blog.title = title;
    blog.subtitle = subtitle;
    console.log(title, subtitle);
  };
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage containerClass="editor-wrapper" className="blog-editor-page">
          <SlateEditor save={this.saveBlog} />
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth("siteOwner")(BlogEditor);
