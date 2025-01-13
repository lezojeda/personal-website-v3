function generatePagination(posts, postsPerPage) {
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const paginatedPosts = [];

  for (let page = 2; page <= totalPages; page++) {
    const start = (page - 1) * postsPerPage;
    paginatedPosts.push(posts.slice(start, start + postsPerPage));
  }

  return paginatedPosts;
}

module.exports = { generatePagination };
