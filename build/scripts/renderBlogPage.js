const { formatDate } = require("./utils");
const path = require("path");
const { render } = require("./renderPage");

/**
 * Renders the blog listing page for a specific language
 * @param {Post[]} posts - Array of blog post objects with metadata and content
 * @param {string} langOutputDir - Output directory for the specific language (e.g., './dist' or './dist/es')
 * @param {string} lang - Language code ('en' or 'es')
 * @throws {Error} If rendering or file writing fails
 */
function renderBlogPage(posts, langOutputDir, lang) {
	const postsWithFormattedDate = posts.map(post => ({
		...post,
		data: {
			...post.data,
			pubDate: formatDate(post.data.pubDate, lang),
		},
	}));

	render({
		templateName: "blog.njk",
		outputPath: path.join(langOutputDir, "blog.html"),
		context: {
			posts: postsWithFormattedDate,
			pageName: "blog",
		},
		lang,
	});
}

module.exports = { renderBlogPage };
