import fs from "fs";
import frontMatter from "front-matter";
import path from "path";

const getAllPosts = () => {
  try {
    return fs
      .readdirSync("src/posts/")
      .map((fileName) => {
        const post = fs.readFileSync(
          path.resolve("src/posts", fileName),
          "utf-8"
        );
        const postFrontMatter = frontMatter(post);
        return {
          title: postFrontMatter.attributes.title,
          slug: postFrontMatter.attributes.slug,
          tags: postFrontMatter.attributes.tags,
          published: postFrontMatter.attributes.published,
          // Add html if needed
        };
      })
      .filter((post) => post.published);
  } catch (e) {
    return [];
  }
};

export async function get() {
  console.log("getAllPosts");
  const posts = getAllPosts();
  return {
    body: posts
  };
}
