const { formatDate } = require("./utils");
const fs = require("fs");
const path = require("path");
const constants = require("../constants");
const { configureNunjucksEnv } = require("./utils");

function renderBlogPage(posts, langOutputDir, lang) {
	const postsWithFormattedDate = posts.map(post => {
		const formattedDate = formatDate(post.data.pubDate, lang);
		return {
			...post,
			data: {
				...post.data,
				pubDate: formattedDate,
			},
		};
	});

	const context = {
		pageTitle: `${constants.SITE_TITLE} - blog`,
		posts: postsWithFormattedDate,
		lang
	};

	const env = configureNunjucksEnv(lang);
	const blogHTML = env.render("blog.njk", context);

	const outputPath = path.join(langOutputDir, "blog.html")

	fs.writeFileSync(outputPath, blogHTML);
}

module.exports = { renderBlogPage };
