# Build Process

This project builds a static blog site by rendering pages from Markdown files and metadata. Below is an overview of the build process.

## How It Works

1. **Project Structure**

   - Blog posts are stored in Markdown files under the `content/blog` directory.
   - Templates for pages are located in the `src/layouts` directory, using [Nunjucks](https://mozilla.github.io/nunjucks/) for rendering.
   - The output directory for the generated site is `dist`.

2. **Build Steps**

   - **Initialize Output Directory**: The `mkdirp` library ensures the `dist` directory exists.
   - **Metadata Extraction**: `getPosts` reads posts metadata (e.g., title, publication date) from Markdown files in `content/blog` and sorts them.
   - **Index Page Generation**:
     - `renderBlogPage` generates the main index page, listing the latest 5 posts.
     - Pagination is created using `generatePagination` for additional pages.
   - **Post Pages Generation**: Each individual blog post is rendered as an HTML page using `renderPostPage`.

3. **File Structure**  
   Key files in the build process:

   - `generateMetadata.js`: Extracts metadata from Markdown posts.
   - `renderPostPage.js`: Renders individual post pages.
   - `renderBlogPage.js`: Renders the main index page and paginated pages.
   - `pagination.js`: Handles splitting posts into paginated groups.

4. **Build Output**

   - All generated files are placed in the `dist` directory.
   - The index page is saved as `dist/index.html`.
   - Individual blog posts are saved as `dist/{slug}.html`.

5. **Example Command**  
   Run the build script to generate the site:
   ```bash
   node src/build.js
   ```
