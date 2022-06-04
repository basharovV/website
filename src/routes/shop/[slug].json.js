import posts from "./_products.js";

const lookup = new Map();
posts.forEach((post) => {
  lookup.set(post.id, JSON.stringify(post));
});

export function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = req.params;

  if (lookup.has(slug)) {
    return {
      body: lookup.get(slug),
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
