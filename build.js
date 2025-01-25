const path = require("path");
const { getPosts } = require("./scripts/getPosts");
const { renderPostPage } = require("./scripts/renderPostPage");
const { renderBlogPage } = require("./scripts/renderBlogPage");
const { renderPage } = require("./scripts/renderPage");
const { buildJavascriptFiles } = require("./scripts/buildScripts");
const fs = require("fs");
const constants = require("./constants");

const outputDir = "./dist";

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir);
}

buildJavascriptFiles()

constants.LANGUAGES.forEach(lang => {
	/** Pages **/
	const langOutputDir = lang === "en" ? outputDir : `${outputDir}/es`

	if (!fs.existsSync(langOutputDir)) {
		fs.mkdirSync(langOutputDir, { recursive: true });
	}

	const posts = getPosts(lang);

	/** Render Pages **/
	const pagesDir = lang === "en" ? "./src/pages" : "./src/pages/es";
	const pagesFiles = fs.readdirSync(pagesDir, { withFileTypes: true });

	pagesFiles.forEach(pageFile => {
		// Only process files, ignore directories
		if (pageFile.isFile()) {
			switch (pageFile.name) {
				case "blog.njk":
					renderBlogPage(posts, langOutputDir, lang);
					break;
				default:
					renderPage(pageFile.name, langOutputDir, lang);
					break;
			}
		}
	});

	/** Individual Posts Pages **/
	(async () => {
		for (const post of posts) {
			const postOutputPath = path.join(langOutputDir, `${post.data.slug}`);
			try {
				await renderPostPage(post, postOutputPath, lang);
			} catch (err) {
				console.error(`Error generating post "${post.data.title}":`, err);
				console.log();
			}
		}
		console.log(`\x1b[32mBuild completed for language: ${lang}!\x1b[0m`);
	})();
});
