import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import SlateEditor from "../components/slate-editor/Editor";
import { getBlogbyId } from "../actions";

class BlogEditor extends React.Component {
  static async getInitialProps({ query }) {
    const blogId = query.id;
    try {
      const blog = await getBlogbyId(blogId);
      return { blog };
    } catch (err) {
      return { err };
    }
  }

  state = {
    isSaving: false
  };

  render() {
    const { blog } = this.props;
    console.log("BLOG", blog);
    const { isSaving } = this.state;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage containerClass="editor-wrapper" className="blog-editor-page">
          <SlateEditor
            isLoading={isSaving}
            save={() => console.log("here should be update")}
          />
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth("siteOwner")(BlogEditor);
