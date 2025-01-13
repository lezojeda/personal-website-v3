const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

const distPath = path.join(__dirname, "dist")

app.get("/", (req, res) => {
	res.sendFile(path.join(distPath, "home.html"));
});

app.get("/blog", (req, res) => {
	res.sendFile(path.join(distPath, "blog.html"));
});

app.get("/feed", (req, res) => {
	res.sendFile(path.join(distPath, "feed.html"));
});

function getHTMLContent(slug) {
	const filePath = path.join(distPath, slug);
	try {
		return fs.readFileSync(filePath, "utf-8");
	} catch (error) {
		console.error(`Error reading HTML file for ${slug}:`, error);
		return null;
	}
}

function createDynamicRoutes() {
	fs.readdirSync(distPath).forEach(file => {
		if (file && !file.includes(".")) {
			const slug = file;
			app.get(`/${slug}`, (req, res) => {
				const pageContent = getHTMLContent(slug);
				if (pageContent) {
					res.send(pageContent);
				} else {
					res.status(404).send(`${slug} page not found`);
				}
			});
		}
	});
}

createDynamicRoutes();

app.use((req, res) => {
	res.status(404).send("Page not found");
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
