const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/scss/");
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addFilter("dropContentFolder", function (path) {
    if (path.endsWith("/index")) {
        path = path.substring(0, -6);
    }
    const pathToDrop = "/pages"
    if (path.indexOf(pathToDrop) !== 0) {
        return path
    }
    return path.slice(pathToDrop.length)
  });
  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};