// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.


// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.


const products = [
    {
      id: "rhodesian-keys",
      description:
        "A sampled Fender Rhodes Mark I. Available as a Kontakt 6.+ instrument. 73 keys, 511 samples with 6 velocity layers, plus key press and release samples. ",
      image: "product-assets/rhodesian-keys/rhodesian-keys-bg.png",
      name: "Rhodesian Keys (Edition I)",
      price: "",
      url: "products/rhodesian-keys",
      tags: ["Kontakt instrument", "Sample library"],
      size: "682.9 MB",
      video: "https://www.youtube-nocookie.com/embed/2PP0OrzS_k8"
    },
  ];
  
export default products;
