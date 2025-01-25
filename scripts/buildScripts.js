const path = require("path");
const fs = require("fs");

function buildJavascriptFiles() {
	const src = path.join(__dirname, "..", "src", "scripts");
	const dest = path.join("dist", "scripts");
	if (!fs.existsSync(src)) return;

	const entries = fs.readdirSync(src, { withFileTypes: true });

	if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest, { recursive: true });
	}

	for (const entry of entries) {
		const srcPath = path.join(src, entry.name);
		const destPath = path.join(dest, entry.name);

		if (entry.isDirectory()) {
			copyRecursiveSync(srcPath, destPath);
		} else if (entry.isFile()) {
			fs.copyFileSync(srcPath, destPath);
			console.log(`\x1b[32mCopied ${srcPath} to ${destPath}\x1b[0m`);
		}
	}
}

module.exports = { buildJavascriptFiles };
