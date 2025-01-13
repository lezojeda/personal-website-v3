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

async function renderPostPage(post, siteTitle, outputPath) {
  const context = {
    canonicalURL: `https://your-website.com/${post.slug}.html`,
    content: parseMarkdown(post.content),
    description: post.content.slice(0, 150),
    pageTitle: `${post.data.title} - ${siteTitle}`,
    pubDate: formatDate(post.data.pubDate, true),
    tags: post.data.tags
  };

  const postHTML = env.render("templates/post.njk", context);

  // Check if file has changed before writing
  const fileChanged = await checkIfFileChanged(outputPath, postHTML);
  if (!fileChanged) return;

  fs.writeFileSync(outputPath, postHTML);
  console.log(`Post ${post.data.slug} updated or created.`);
  // TODO: remember to serve posts as HTML explicitly somehow
}

module.exports = { renderPostPage };
