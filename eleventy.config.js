import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import Image from "@11ty/eleventy-img";

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [500, 900],
    formats: ["avif", "jpeg", "svg"],
    outputDir: "./public/assets/img/",
    urlPath: "/assets/img/",
    svgShortCircuit: true,
  });

  let imageAttributes = {
    alt,
    sizes,
  };

  return Image.generateHTML(metadata, imageAttributes);
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets/static");
  eleventyConfig.addWatchTarget("./src/scss/");
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addFilter("dropContentFolder", function (path) {
    if (path.endsWith("/index")) {
      path = path.substring(0, -6);
    }
    const pathToDrop = "/pages";
    if (path.indexOf(pathToDrop) !== 0) {
      return path;
    }
    return path.slice(pathToDrop.length);
  });
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
}
