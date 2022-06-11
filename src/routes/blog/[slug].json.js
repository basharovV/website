import fs from "fs";
import frontMatter from "front-matter";
import path from "path";


const getPost = async (fileName) => {
  const post = await import(`../../posts/${fileName}.md`);

  return {
    ...post.metadata,
    html: post.default.render().html,
    // Add html if needed
  };
};

export async function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = req.params;
  const post = await getPost(slug);
  if (post.html) {
    return {
      body: post,
    };
  } else {
    return {
      status: 404,
      body: {
        message: "Not found",
      },
    };
  }
}
