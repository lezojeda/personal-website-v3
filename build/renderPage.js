const nunjucks = require("nunjucks");
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const env = nunjucks.configure("src");

function renderPage(templateName, outputPath, context = {}) {
  const html = env.render(templateName, context);

  fs.writeFileSync(outputPath, html, "utf-8");
  console.log(`Generated ${outputPath}`);
}

module.exports = { renderPage };
