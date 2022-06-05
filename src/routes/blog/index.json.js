import fs from "fs";
import frontMatter from "front-matter";
import path from "path";
import { dev } from "$app/env";

const getAllPosts = (isWip) => {
  try {
    return fs
      .readdirSync(isWip ? "static/posts-wip/" : "static/posts/")
      .map((fileName) => {
        const post = fs.readFileSync(
          path.resolve(isWip ? "static/posts-wip/" : "static/posts/", fileName),
          "utf-8"
        );
        const postFrontMatter = frontMatter(post);
        return {
          title: postFrontMatter.attributes.title,
          slug: postFrontMatter.attributes.slug,
          tags: postFrontMatter.attributes.tags,
          published: isWip ? false : postFrontMatter.attributes.published,
          // Add html if needed
        };
      })
      .filter((post) => isWip ? true : post.published);
  } catch (e) {
    return [];
  }
};

export async function get() {
  const posts = getAllPosts(false);
  if (dev) {
    const wipPosts = getAllPosts(true);
    if (wipPosts.length) posts.unshift(...wipPosts);
  }
  return {
    body: posts,
  };
}
