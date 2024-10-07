import fs from "fs";
import frontMatter from "front-matter";
import path from "path";

const getPost = async (fileName) => {
    const post = await import(`../../../posts/${fileName}.md`);
    console.log("html", post.default);
    return {
        ...post.metadata,
        content: post.default
        // Add html if needed
    };
};

export async function load(req, res, next) {
    // the `slug` parameter is available because
    // this file is called [slug].json.js
    const { slug } = req.params;
    const post = await getPost(slug);
    console.log("post", post);
    if (post.content) {
        return {
            body: post, 
            slug: slug
        };
    } else {
        return {
            status: 404,
            body: {
                message: "Not found"
            }
        };
    }
}
