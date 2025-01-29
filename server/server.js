const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

const { PATHS, URL_MAPPINGS } = require("../config");

app.use(
	express.static(PATHS.DIST, {
		extensions: ["html"],
		setHeaders: (res, path, stat) => {
			if (path.endsWith(".html")) {
				res.setHeader("Content-Type", "text/html");
			}
		},
	})
);

// Handle mapped URLs such as about/sobre-mi or contact/contacto
Object.entries(URL_MAPPINGS).forEach(([pageName, mapping]) => {
	app.get(`/${mapping.en}`, (req, res) => {
		res.sendFile(path.join(PATHS.getPagesDir("en"), `${pageName}.html`));
	});

	app.get(`/es/${mapping.es}`, (req, res) => {
		res.sendFile(path.join(PATHS.getPagesDir("es"), `${pageName}.html`));
	});
});

app.get(["/", "/es", "/es/"], (req, res) => {
	const lang = req.path.startsWith("/es") ? "es" : "en";
	res.sendFile(path.join(PATHS.getOutputDir(lang), "home.html"));
});

app.get("/:slug", (req, res, next) => {
	const { slug } = req.params;
	const filePath = path.join(PATHS.DIST, `${slug}.html`);

	if (fs.existsSync(filePath)) {
		res.sendFile(filePath);
	} else {
		next();
	}
});

app.use((req, res) => {
	res.status(404).send("Page not found");
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
