const fs = require('fs');
const frontMatter = require('front-matter');
const marked = require('marked');
const path = require('path');

const getPost = (fileName) => {
	const postContent = fs.readFileSync(
	  path.resolve("static/posts/", `${fileName}.md`),
	  "utf-8"
	);
	const postFrontMatter = frontMatter(postContent);
	return {
		...postFrontMatter.attributes,
		html: marked(postFrontMatter.body).replace(/^\t{3}/gm, '')
		// Add html if needed
	}
  }

export function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;
	const post = getPost(slug);
	if (post.html) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify(post));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}
