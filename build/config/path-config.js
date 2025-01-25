const path = require("path");

const URL_MAPPINGS = {
	about: {
		en: "about",
		es: "sobre-mi",
	},
};

// Helper to get project root
const PROJECT_ROOT = path.join(__dirname, "..", "..");

const PATHS = {
	SRC: path.join(PROJECT_ROOT, "src"),
	CONTENT: path.join(PROJECT_ROOT, "src", "content"),
	TEMPLATES: path.join(PROJECT_ROOT, "src", "templates"),

	// Output paths
	DIST: path.join(PROJECT_ROOT, "dist"),

	// Helper functions for language-specific paths
	getPagesDir: lang => path.join(PROJECT_ROOT, "src", "pages", lang === "es" ? "es" : ""),
	getBlogDir: lang => path.join(PROJECT_ROOT, "src", "content", "blog", lang),
	getOutputDir: lang => path.join(PROJECT_ROOT, "dist", lang === "es" ? "es" : ""),
};

module.exports = { PATHS, URL_MAPPINGS };
