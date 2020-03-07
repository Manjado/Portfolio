const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");

module.exports = withCSS(withSass());

// module.exports = withCSS(
//   withSass({
//     webpack: (config, { isServer }) => {
//       // Fixes npm packages that depend on `fs` module
//       if (!isServer) {
//         config.node = {
//           fs: "empty",
//           net: "empty"
//         };
//       }

//       return config;
//     }
//   })
// );

// module.exports = {
//   webpack: (config, { isServer }) => {
//     // Fixes npm packages that depend on `fs` module
//     if (!isServer) {
//       config.node = {
//         fs: "empty"
//       };
//     }

//     return config;
//   }
// };
