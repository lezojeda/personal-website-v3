const path = require("path");
const { getPosts } = require("./getPosts");
const { renderPostPage } = require("./renderPostPage");
const { renderBlogPage } = require("./renderBlogPage");
const { renderPage } = require("./renderPage")
const fs = require('fs')

/** Variables **/
const SITE_TITLE = "Lucas Ezequiel Ojeda";
const SITE_DESCRIPTION =
  "The personal web page of a web developer, sometimes cook and bookworm from Buenos Aires, Argentina";

const outputDir = path.join(__dirname, "..", "dist");

if (!fs.existsSync(outputDir)){
  fs.mkdirSync(outputDir);
}

/** Get posts **/
const postsDir = path.join(__dirname, "..", "content", "blog");
const posts = getPosts(postsDir);

/** Pages **/

renderBlogPage(posts, SITE_TITLE, SITE_DESCRIPTION);

fs.readdirSync(path.join(__dirname, "..", "src"))
  .filter((file) => file.endsWith(".njk") && file !== "blog.njk")
  .forEach((templateFile) => {
    const templateName = path.basename(templateFile, ".njk");
    const outputPath = path.join(outputDir, `${templateName}.html`);
    const context = {
      pageTitle: `${SITE_TITLE} - ${templateName.charAt(0).toUpperCase() + templateName.slice(1)}`,
      description: `This is the ${templateName} page of the site.`,
    };
    renderPage(templateFile, outputPath, context);
  });


// Individual post pages
(async () => {
  for (const post of posts) {
    const postOutputPath = path.join("dist", `${post.data.slug}`);
    try {
      await renderPostPage(post, SITE_TITLE, postOutputPath);
    } catch (err) {
      console.error(`Error generating post "${post.data.title}":`, err);
      console.log();
    }
  }
  console.log("\x1b[32mBuild completed!\x1b[0m");
})();
