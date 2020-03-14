const routes = require("next-routes");

module.exports = routes()
  .add("test", "/test/:id")
  .add("portfolioNew", "/portfolios/new")
  .add("portfolioEdit", "/portfolio/:id/edit")
  .add("userBlogs", "/blogs/dashboard")
  .add("blogEditor", "/blogs/new")
  .add("blogDetail", "/blogs/:slug")
  .add("blogEditorUpdate", "/blogs/:id/edit");
