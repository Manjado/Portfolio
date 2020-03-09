const routes = require("next-routes");

module.exports = routes()
  .add("test", "/test/:id")
  .add("portfolioEdit", "/portfolio/:id/edit")
  .add("blogEditor", "/blogs/new")
  .add("blogDetail", "/blogs/:slug")
  .add("blogEditorUpdate", "/blogs/:id/edit");
