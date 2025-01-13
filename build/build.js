const path = require("path");
const mkdirp = require("mkdirp");
const { getPosts } = require("./getPosts");
const { renderPostPage } = require("./renderPostPage");
const { renderIndexPage } = require("./renderIndexPage");
const { generatePagination } = require("./pagination");

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

// Generate the index page
renderIndexPage(posts, SITE_TITLE, SITE_DESCRIPTION);

// Generate individual post pages
(async () => {
  for (const post of posts) {
    const postOutputPath = path.join("dist", `${post.data.slug}`);
    await renderPostPage(post, SITE_TITLE, postOutputPath);
  }

  console.log("Build complete!");
})();
