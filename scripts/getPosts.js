const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

function sortByMostRecent(posts) {
	return posts.sort((a, b) => {
		const dateA = a.data.pubDate;
		const dateB = b.data.pubDate;

		return new Date(dateB) - new Date(dateA);
	});
}

module.exports = { sortByMostRecent };

function getPosts(lang = "en") {
	const postsDir = path.join(__dirname, "..", "content", "blog", lang)

	const posts = fs
		.readdirSync(postsDir)
		.map(fileName => {
			const filePath = path.join(postsDir, fileName);
			const fileContent = fs.readFileSync(filePath, "utf-8");

			let postMatter;

			try {
				postMatter = matter(fileContent);
			} catch (err) {
				console.error(
					`\x1b[31m Error parsing front matter in post: ${filePath} \x1b[0m\n`,
					err
				);
				return null;
			}

			return { ...postMatter, lang };
		})
		.filter(post => post !== null);

	return sortByMostRecent(posts);
}

module.exports = { getPosts };
