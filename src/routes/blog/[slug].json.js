const fs = require("fs");
const frontMatter = require("front-matter");
const marked = require("marked");
const path = require("path");
import hljs from "highlight.js";
const hljs_svelte = require('highlightjs-svelte');
hljs_svelte(hljs);

const getPost = (fileName) => {
  const postContent = fs.readFileSync(
    path.resolve("static/posts/", `${fileName}.md`),
    "utf-8"
  );
  const postFrontMatter = frontMatter(postContent);

  const renderer = new marked.Renderer();
  // use hljs to highlight our blocks codes
  renderer.code = (source, lang) => {
    const { value: highlighted } = hljs.highlightAuto(source);
    return `<pre ><code>${highlighted}</code></pre>`;
  };

  return {
    ...postFrontMatter.attributes,
    html: marked(postFrontMatter.body, { renderer }).replace(/^\t{3}/gm, ""),
    // Add html if needed
  };
};

export function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = req.params;
  const post = getPost(slug);
  if (post.html) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify(post));
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: `Not found`,
      })
    );
  }
}
