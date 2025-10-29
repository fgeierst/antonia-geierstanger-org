import { RenderPlugin } from "@11ty/eleventy";
import Image from "@11ty/eleventy-img";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import pluginWebc from "@11ty/eleventy-plugin-webc";

/**
 * @param {string} src
 * @param {string} alt
 * @param {string} sizes
 * @param {"high"|"low"|"auto"|undefined} fetchpriority
 */
async function imageShortcode(src, alt, sizes, fetchpriority) {
	let metadata = await Image(src, {
		widths: [500, 900],
		formats: ["avif", "jpeg", "svg"],
		outputDir: "./dist/assets/img/",
		urlPath: "/assets/img/",
		svgShortCircuit: true,
	});

	/** @type {{ alt: string; sizes: string; fetchpriority?: string }} */
	let imageAttributes = {
		alt,
		sizes,
	};

	if (fetchpriority) {
		imageAttributes.fetchpriority = fetchpriority;
	}

	return Image.generateHTML(metadata, imageAttributes);
}

/**
 * @param {any} eleventyConfig
 */
export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("./src/assets/static");
	eleventyConfig.addPassthroughCopy("./src/.htaccess");
	eleventyConfig.addWatchTarget("./src/css/");
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(RenderPlugin);
	eleventyConfig.addPlugin(pluginWebc, {
		components: ["src/_includes/**/*.webc"],
	});
	eleventyConfig.addFilter(
		"dropContentFolder",
		/**
		 * @param {string} path
		 */
		function (path) {
			/** @type {string} */
			let localPath = path;
			if (path.endsWith("/index")) {
				localPath = path.substring(0, -6);
			}
			const pathToDrop = "/pages";
			if (localPath.indexOf(pathToDrop) !== 0) {
				return localPath;
			}
			return localPath.slice(pathToDrop.length);
		}
	);
	eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
	eleventyConfig.addLiquidShortcode("image", imageShortcode);

	return {
		dir: {
			input: "src",
			output: "dist",
		},
	};
}
