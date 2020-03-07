import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

import { getBlogBySlug } from "../actions";

class BlogDetail extends React.Component {
  static async getInitialProps({ query }) {
    let blog = {};
    const slug = query.slug;

    try {
      blog = await getBlogBySlug(slug);
    } catch (err) {
      console.error(err);
    }

    return { blog };
  }
  render() {
    const { blog } = this.props;
    console.log(blog);
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage
          className="blog-detail-page"
          title="I am Blog Details Page"
        ></BasePage>
      </BaseLayout>
    );
  }
}

export default BlogDetail;
