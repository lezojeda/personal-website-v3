const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

const distPath = path.join(__dirname, "dist");

app.use(express.static(distPath, {
	extensions: ['html'],
	setHeaders: (res, path, stat) => {
		if (path.endsWith('.html')) {
			res.setHeader('Content-Type', 'text/html');
		}
	}
}));

app.get(['/', '/es', '/es/'], (req, res) => {
    const lang = req.path.startsWith('/es') ? 'es' : '';
    res.sendFile(path.join(distPath, lang, 'home.html'));
});

app.get('/:slug', (req, res, next) => {
    const { slug } = req.params;
    const filePath = path.join(distPath, `${slug}.html`);
    
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        next();
    }
});

// Handle Spanish dynamic routes
app.get('/es/:slug', (req, res, next) => {
    const { slug } = req.params;
    const filePath = path.join(distPath, 'es', `${slug}.html`);
    
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
