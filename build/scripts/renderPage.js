const fs = require("fs");
const constants = require("../config/constants");
const path = require("path");
const { configureNunjucksEnv } = require("./utils");
const { URL_MAPPINGS } = require("../../config");

/**
 * @typedef {Object} RenderOptions
 * @property {string} templateName - Name of the Nunjucks template file to render
 * @property {string} outputPath - Full path where the rendered HTML will be saved
 * @property {Object} [context={}] - Data to be passed to the template
 * @property {string} lang - Language code ('en' or 'es')
 */

/**
 * Generic render function that handles template rendering and file output
 * @param {RenderOptions} options - Configuration options for rendering
 * @throws {Error} If template rendering or file writing fails
 */
function render(options) {
	const { templateName, outputPath, context = {}, lang } = options;

	const env = configureNunjucksEnv(lang);

	const html = env.render(templateName, {
		pageTitle: `${constants.SITE_TITLE} - ${context.pageName || templateName}`,
		lang,
		...context,
	});

	fs.writeFileSync(outputPath, html, "utf-8");
}

/**
 * Renders a regular page (non-blog, non-post) for a specific language
 * @param {string} pageFile - Name of the page template file
 * @param {string} langOutputDir - Output directory for the specific language
 * @param {string} lang - Language code ('en' or 'es')
 */
function renderPage(pageFile, langOutputDir, lang) {
	const pageName = path.basename(pageFile, ".njk");
	const mapping = URL_MAPPINGS[pageName];
	const outputFilename = mapping ? `${mapping[lang]}.html` : `${pageName}.html`;

	render({
		templateName: pageFile,
		outputPath: path.join(langOutputDir, outputFilename),
		context: {
			pageName,
		},
		lang,
	});
}

module.exports = { render, renderPage };
