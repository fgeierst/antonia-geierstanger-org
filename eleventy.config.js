export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("./src/.htaccess");

	return {
		dir: {
			input: "src",
			output: "dist",
		},
	};
}
