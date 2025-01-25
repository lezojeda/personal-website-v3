const path = require("path");

const URL_MAPPINGS = {
	about: {
		en: "about",
		es: "sobre-mi",
	},
};

const PATHS = {
	SRC: path.join(__dirname, "src"),
	CONTENT: path.join(__dirname, "content"),
	TEMPLATES: path.join(__dirname, "src", "templates"),

	// Output paths
	DIST: path.join(__dirname, "dist"),

	// Helper functions for language-specific paths
	getPagesDir: lang => path.join(__dirname, "src", "pages", lang === "es" ? "es" : ""),
	getBlogDir: lang => path.join(__dirname, "content", "blog", lang),
	getOutputDir: lang => path.join(__dirname, "dist", lang === "es" ? "es" : ""),
};

module.exports = { PATHS, URL_MAPPINGS };
