import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import SlateEditor from "../components/slate-editor/Editor";
import { createBlog } from "../actions";

class BlogEditor extends React.Component {
  state = {
    isSaving: false
  };
  saveBlog = (story, { title, subtitle }) => {
    //console.log(story, "STORY", title, "titile", subtitle, "sub");
    const blog = {};
    blog.title = title;
    blog.subTitle = subtitle;
    blog.story = story;

    this.setState({ isSaving: true });
    createBlog(blog)
      .then(data => {
        this.setState({ isSaving: false });
        // console.log(data);
      })
      .catch(err => console.log(err || "server error"));
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
