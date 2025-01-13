const nunjucks = require("nunjucks");
const { formatDate } = require("./utils");
const fs = require("fs");
const path = require("path");

const env = nunjucks.configure("src");

function renderIndexPage(posts, siteTitle, siteDescription) {
  const postsWithFormatteDate = posts.map(post => {
    const formattedDate = formatDate(post.data.pubDate)
    return {
      ...post,
      data: {
        ...post.data,
        pubDate: formattedDate
      }
    }
  })

  const context = {
    pageTitle: siteTitle,
    description: siteDescription,
    canonicalURL: "https://your-website.com",
    posts: postsWithFormatteDate,
  };

  const indexHTML = env.render("index.njk", context);
  fs.writeFileSync(path.join("dist", "index.html"), indexHTML);
}

module.exports = { renderIndexPage };
