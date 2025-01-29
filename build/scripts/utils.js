const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const nunjucks = require("nunjucks");
const { PATHS } = require("../../config");

function parseMarkdown(content) {
	const md = markdownIt().use(markdownItAnchor);
	return md.render(content);
}

const formatDate = (date, lang, includeYearInDate = false) => {
	const formattedDate = date
		.toLocaleDateString(lang, {
			month: "short",
			day: "numeric",
			...(includeYearInDate && { year: "numeric" }),
		})
		.toLowerCase();

	return formattedDate;
};

function configureNunjucksEnv(lang) {
	const defaultPaths = [PATHS.getPagesDir(lang), PATHS.TEMPLATES, PATHS.INCLUDES];

	return nunjucks.configure(defaultPaths);
}

module.exports = { parseMarkdown, formatDate, configureNunjucksEnv };
