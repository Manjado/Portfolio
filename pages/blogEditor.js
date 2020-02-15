import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import SlateEditor from "../components/slate-editor/Editor";
import { saveBlog } from "../actions";

class BlogEditor extends React.Component {
  state = {
    isSaving: false
  };
  saveBlog = ({ title, subtitle }) => {
    const blog = {};
    blog.title = title;
    blog.subtitle = subtitle;

    this.setState({ isSaving: true });
    saveBlog().then(data => {
      this.setState({ isSaving: false });
      console.log(data);
    });
  };
  render() {
    const { isSaving } = this.state;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage containerClass="editor-wrapper" className="blog-editor-page">
          <SlateEditor isLoading={isSaving} save={this.saveBlog} />
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth("siteOwner")(BlogEditor);
