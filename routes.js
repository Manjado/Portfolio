const routes = require('next-routes');

module.exports = routes()
  .add('test', '/test/:id')
  .add('portfolioEdit', '/portfolio/:id/edit');
