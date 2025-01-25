const nunjucks = require("nunjucks");
const { formatDate, checkIfFileChanged } = require("./utils");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const md = markdownIt().use(markdownItAnchor);
const fs = require("fs");

function parseMarkdown(content) {
	return md.render(content);
}

const env = nunjucks.configure("src");

async function renderPostPage(post, outputPath, lang) {
	const context = {
		content: parseMarkdown(post.content),
		description: post.content.slice(0, 150),
		pageTitle: `${post.data.title}`,
		pubDate: formatDate(post.data.pubDate, lang, true),
		tags: post.data.tags,
	};

	const postHTML = env.render("templates/post.njk", context);

	// Check if file has changed before writing
	if (fs.existsSync(outputPath)) {
		const fileChanged = await checkIfFileChanged(outputPath, postHTML);
		if (!fileChanged) return;
	}

	fs.writeFileSync(outputPath, postHTML);
	console.log(`Post ${post.data.slug} updated or created.`);
	// TODO: remember to serve posts as HTML explicitly somehow
}

module.exports = { renderPostPage };
