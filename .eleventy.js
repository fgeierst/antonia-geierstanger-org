const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes ) {
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ["avif", "jpeg", "svg"],
    outputDir: "./public/assets/img/",
    urlPath: "/assets/img/",
    svgShortCircuit: true,
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets/static");
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
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};