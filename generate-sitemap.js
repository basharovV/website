import fs from "fs";
const BASE_URL = 'https://vyacheslavbasharov.com/';
const ROUTES = "./src/routes";
import products from "./src/routes/shop/_products.js";

const pages = [""];

const getRoutes = (root) => {
  fs.readdirSync(root).forEach((file) => {
    const excluded = ["index", "rss", "sitemap", "images", "[slug]"];
    const fileStart = file.split(".")[0];

    if (fileStart.charAt(0) !== "_" && !excluded.includes(fileStart)) {
      const directory = `${root}/${file}`;
      if (
        fs.lstatSync(directory).isDirectory() &&
        directory === ROUTES + "/" + "shop"
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
    }
  });
};

getRoutes(ROUTES);

const render = (pages) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${pages.map((page) => `<url><loc>${BASE_URL}${page}</loc></url>`).join("\n")}
</urlset>`;
const sitemap = render(pages);

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

createFile("./static/sitemap.xml", sitemap);
