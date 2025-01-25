const fs = require("fs");
const path = require("path");
const {URL_MAPPINGS} = require("../../../config");
const { PATHS } = require("../path-config");

function buildBrowserConfig() {
	const configContent = `window.URL_TRANSLATIONS = ${JSON.stringify(URL_MAPPINGS, null, 2)};`;

	const outputDir = path.join(PATHS.DIST, "scripts");
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	fs.writeFileSync(path.join(outputDir, "i18n.js"), configContent);
}

module.exports = { buildBrowserConfig };
