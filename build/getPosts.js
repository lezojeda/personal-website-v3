const fs = require("fs");
const path = require("path");
const matter = require('gray-matter');

function sortByMostRecent(posts) {
  return posts.sort((a, b) => {
    const dateA = a.data.pubDate;
    const dateB = b.data.pubDate;

    return new Date(dateB) - new Date(dateA);
  });
}

module.exports = { sortByMostRecent };


function getPosts(postsDir) {
  const posts = fs.readdirSync(postsDir).map((fileName) => {
    const filePath = path.join(postsDir, fileName);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    return matter(fileContent)
  });

  return sortByMostRecent(posts);
}

module.exports = { getPosts };
