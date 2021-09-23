const fs = require("fs");
const frontMatter = require("front-matter");
const path = require("path");

const getAllPosts = () => {
  try {
    return fs.readdirSync("static/posts/").map((fileName) => {
      const post = fs.readFileSync(
        path.resolve("static/posts", fileName),
        "utf-8"
      );
      const postFrontMatter = frontMatter(post);
      return {
        title: postFrontMatter.attributes.title,
        slug: postFrontMatter.attributes.slug,
        tags: postFrontMatter.attributes.tags,
        published: postFrontMatter.attributes.published
        // Add html if needed
      };
    }).filter(post => post.published);
  } catch (e) {
    return [];
  }
};

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(getAllPosts()));
}
