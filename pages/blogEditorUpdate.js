import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import SlateEditor from "../components/slate-editor/Editor";
import { toast } from "react-toastify";

import { getBlogbyId, updateBlog } from "../actions";

class BlogEditor extends React.Component {
  static async getInitialProps({ query }) {
    const blogId = query.id;
    let blog = {};
    try {
      blog = await getBlogbyId(blogId);
    } catch (err) {
      console.error(err);
    }
    return { blog };
  }

  state = {
    isSaving: false
  };

  updateBlog = (story, { title, subtitle }) => {
    const { blog } = this.props;
    const updatedBlog = {};
    updatedBlog.title = title;
    updatedBlog.subTitle = subtitle;
    updatedBlog.story = story;
    console.log(updateBlog, "blog");
    this.setState({ isSaving: true });
    updateBlog(updatedBlog, blog._id)
      .then(updatedBlog => {
        toast.success("Blog Save Succesly!");
        this.setState({ isSaving: false });
      })
      .catch(err => {
        this.setState({ isSaving: false });
        const message = err || "server error";
        toast.error(
          "Unexpected Error, Copy your progress and refresch browser"
        );
        console.error(message);
      });
  };

  render() {
    const { blog } = this.props;
    console.log("BLOG", blog);
    const { isSaving } = this.state;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage containerClass="editor-wrapper" className="blog-editor-page">
          <SlateEditor
            initialValue={blog.story}
            isLoading={isSaving}
            save={this.updateBlog}
          />
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth("siteOwner")(BlogEditor);
