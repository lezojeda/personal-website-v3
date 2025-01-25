const fs = require("fs");
const path = require("path");
const urlTranslations = require("./urls");
const { PATHS } = require("../path-config");

function buildBrowserConfig() {
	const configContent = `window.URL_TRANSLATIONS = ${JSON.stringify(urlTranslations.pages, null, 2)};`;

	const outputDir = path.join(PATHS.DIST, "scripts");
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	fs.writeFileSync(path.join(outputDir, "i18n.js"), configContent);
}

module.exports = { buildBrowserConfig };
