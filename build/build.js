const path = require("path");
const mkdirp = require("mkdirp");
const { getPosts } = require("./getPosts");
const { renderPostPage } = require("./renderPostPage");
const { renderIndexPage } = require("./renderIndexPage");

/** Variables **/
const SITE_TITLE = "Lucas Ezequiel Ojeda";
const SITE_DESCRIPTION =
  "The personal web page of a web developer, sometimes cook and bookworm from Buenos Aires, Argentina";

const outputDir = path.join(__dirname, "..", "dist");
mkdirp.sync(outputDir);

/** Get posts **/
const postsDir = path.join(__dirname, "..", "content", "blog");
const posts = getPosts(postsDir);

/** Pages **/

// Index page
renderIndexPage(posts, SITE_TITLE, SITE_DESCRIPTION);

// Individual post pages
(async () => {
  for (const post of posts) {
    const postOutputPath = path.join("dist", `${post.data.slug}`);
    try {
      await renderPostPage(post, SITE_TITLE, postOutputPath);
    } catch (err) {
      console.error(`Error generating post "${post.data.title}":`, err);
      console.log()
    }
  }
  console.log("\x1b[32mBuild completed!\x1b[0m")
})();

