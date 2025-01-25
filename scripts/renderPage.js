const fs = require("fs");
const constants = require("../constants");
const path = require("path");
const { configureNunjucksEnv } = require("./utils");

function renderPage(pageFile, langOutputDir, lang) {
	const pageName = path.basename(pageFile, ".njk");
	const context = {
		pageTitle: `${constants.SITE_TITLE} - ${pageName}`,
		currentPath: getCurrentPath(pageName, lang),
		lang,
	};

	const env = configureNunjucksEnv(lang);
	const pageHTML = env.render(pageFile, context);

	const outputPath = path.join(langOutputDir, `${pageName}.html`);

	fs.writeFileSync(outputPath, pageHTML, "utf-8");
}

function getCurrentPath(pageName, lang) {
	if (pageName.includes("home")) {
		return lang === "en" ? `/` : `/es`;
	}

	return lang === "en" ? `/${pageName}` : `/es/${pageName}`;
}

module.exports = { renderPage };
