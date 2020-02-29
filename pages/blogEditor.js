import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import SlateEditor from "../components/slate-editor/Editor";
import { createBlog } from "../actions";
import { Router } from "../routes";
import { toast } from "react-toastify";

class BlogEditor extends React.Component {
  state = {
    isSaving: false,
    lockId: Math.floor(1000 + Math.random() * 9000)
  };
  saveBlog = (story, { title, subtitle }) => {
    //console.log(story, "STORY", title, "titile", subtitle, "sub");
    const { lockId } = this.state;
    const blog = {};
    blog.title = title;
    blog.subTitle = subtitle;
    blog.story = story;

    this.setState({ isSaving: true });
    createBlog(blog, lockId)
      .then(createdBlog => {
        this.setState({ isSaving: false });
        toast.success("Blog Save Succesly!");
        Router.pushRoute(`/blogs/${createdBlog._id}/edit`);
      })
      .catch(err => {
        console.log(err || "server error");
        toast.error(
          "Unexpected Error, Copy your progress and refresch browser"
        );
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
