const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const crypto = require("crypto");
const fs = require("fs");
const md = markdownIt().use(markdownItAnchor);
const path = require("path");
const nunjucks = require("nunjucks");

function parseMarkdown(content) {
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

function getScryptHash(content) {
	return new Promise((resolve, reject) => {
		const salt = "salt"; // TODO: do I need a better salt?
		crypto.scrypt(content, salt, 64, (err, derivedKey) => {
			if (err) reject(err);
			resolve(derivedKey.toString("hex"));
		});
	});
}

async function checkIfFileChanged(outputPath, newContent) {
	if (!fs.existsSync(outputPath)) {
		const existingContent = fs.readFileSync(outputPath, "utf-8");

		try {
			const [existingHash, newHash] = await Promise.all([
				getScryptHash(existingContent),
				getScryptHash(newContent),
			]);

			if (existingHash === newHash) {
				return false; // File hasn't changed
			}
		} catch (err) {
			console.error("Error during hashing:", err);
			return false;
		}
	}
	console.log(`${outputPath} has changed`);
	return true;
}

function configureNunjucksEnv(lang) {
	const pagesPath = path.join(__dirname, "..", lang === "en" ? "/src/pages" : "/src/pages/es");
	const templatesPath = path.join(__dirname, "..", "src/templates");
	return nunjucks.configure([pagesPath, templatesPath]);
}

module.exports = { formatDate, parseMarkdown, checkIfFileChanged, configureNunjucksEnv };
