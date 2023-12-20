const fs = require("fs");
const frontMatter = require("front-matter");

const BASE_URL = "https://slavbasharov.com/";
const ROUTES = "./src/routes";
const POSTS = "./src/posts";

const pages = [""];

const getRoutes = async (root) => {
  const productsJs = await import("./src/routes/shop/_products.js");
  const products = productsJs.default;
  // console.log("products", products);
  fs.readdirSync(root).forEach((file) => {
    const excluded = ["index", "rss", "sitemap", "images", "[slug]"];
    const fileStart = file.split(".")[0];

    if (fileStart.charAt(0) !== "_" && !excluded.includes(fileStart)) {
      const directory = `${root}/${file}`;

      // Add shop products
      if (
        fs.lstatSync(directory).isDirectory() &&
        directory === ROUTES + "/" + "shop"
      ) {
        pages.push(directory.replace(ROUTES + "/", ""));

        products.forEach((product) => {
          pages.push(product.url);
        });
      } else if (
        fs.lstatSync(directory).isDirectory() &&
        directory === ROUTES + "/" + "blog"
      ) {
        pages.push(directory.replace(ROUTES + "/", ""));

        products.forEach((product) => {
          pages.push(product.url);
        });
      } else if (fs.lstatSync(directory).isDirectory()) {
        pages.push(directory.replace(ROUTES + "/", ""));
        getRoutes(directory);
      } else {
        pages.push(fileStart);
      }

      // Add blog posts
    }
  });
};

const getPosts = () => {
  return Promise.all(
    fs.readdirSync(POSTS).map(
      (file) =>
        new Promise((resolve, reject) => {
          const path = `blog/${file}`;
          const fileText = fs.readFileSync(POSTS + "/" + file, "utf-8");
          const post = frontMatter(fileText);
          if (post.attributes.published) {
            pages.push(path.replace(".md", ""));
          }
          resolve();
        })
    )
  );
};

async function generate() {
  await getRoutes(ROUTES);
  await getPosts();

  const sitemap = render(pages);
  createFile("./static/sitemap.xml", sitemap);
}

const render = (pages) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${pages.map((page) => `<url><loc>${BASE_URL}${page}</loc></url>`).join("\n")}
</urlset>`;

function createFile(filename, sitemap) {
  fs.open(filename, "r", function (err, fd) {
    fs.writeFile(filename, sitemap, function (err) {
      if (err) {
        console.log(err);
      }
      console.log("The file was saved!");
    });
  });
}

generate();
