const path = require("path");
const { getPosts } = require("./scripts/getPosts");
const { renderPostPage } = require("./scripts/renderPostPage");
const { renderBlogPage } = require("./scripts/renderBlogPage");
const { renderPage } = require("./scripts/renderPage");
const { buildJavascriptFiles } = require("./scripts/buildScripts");
const fs = require("fs");
const constants = require("./config/constants");
const { PATHS } = require("../config");
const { buildBrowserConfig } = require("./config/i18n/buildConfig");

// Clean and create dist directory
if (fs.existsSync(PATHS.DIST)) {
	fs.rmSync(PATHS.DIST, { recursive: true });
} else {
	fs.mkdirSync(PATHS.DIST);
}

buildJavascriptFiles();
buildBrowserConfig();

constants.LANGUAGES.forEach(lang => {
	const langOutputDir = PATHS.getOutputDir(lang);
	if (!fs.existsSync(langOutputDir)) {
		fs.mkdirSync(langOutputDir, { recursive: true });
	}

	/** Get posts for current language **/
	const posts = getPosts(lang);

	/** Render Pages **/
	const pagesDir = PATHS.getPagesDir(lang);
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
			const postOutputPath = path.join(langOutputDir, `${post.data.slug}.html`);
			try {
				await renderPostPage(post, postOutputPath, lang);
			} catch (err) {
				console.error(`Error generating page for post "${post.data.title}":`, err);
				console.log();
			}
		}
		console.log(`\x1b[32mBuild completed for language: ${lang}!\x1b[0m`);
	})();
});
