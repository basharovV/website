import fs from "fs";
import frontMatter from "front-matter";
import path from "path";
import marked from "marked";
import hljs from "highlight.js";
import hljs_svelte from "highlightjs-svelte";
hljs_svelte(hljs);

const getPost = (fileName) => {
  const postContent = fs.readFileSync(
    path.resolve("src/posts/", `${fileName}.md`),
    "utf-8"
  );
  const postFrontMatter = frontMatter(postContent);

  const renderer = new marked.Renderer();
  // use hljs to highlight our blocks codes
  renderer.code = (source, lang) => {
    console.log('lang?', lang);
    const { value: highlighted } = lang ? hljs.highlight(lang, source) : hljs.highlightAuto(source);
    return `<pre><code>${highlighted}</code></pre>`;
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
  console.log('reqparams', req.params);
  const { slug } = req.params;
  const post = getPost(slug);
  console.log("POST", post);
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
