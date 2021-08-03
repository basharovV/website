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
        "Rhodesian Keys (Edition I) is the original soft sound of the 1973 Rhodes Mark I, sampled directly from the instrument. Nothing more, nothing less.",
      longDescription: "<h4>Features</h4><ul><li>Kontakt 5+ instrument</li><li>73 keys</li><li>511 samples. 6-10 velocity layers</li><li>Key press + release noises</li></ul><small>Disclaimer: I don't have any association or endorsement by the Rhodes brand. Any references to the Rhodes brand are provided for description purposes only.</small>",
      image: "product-assets/rhodesian-keys/rhodesian-keys-bg.png",
      bannerImage: "product-assets/rhodesian-keys/banner.png",
      name: "Rhodesian Keys (Edition I)",
      price: "",
      url: "products/rhodesian-keys",
      tags: ["Kontakt instrument", "Sample library"],
      size: "682.9 MB",
      video: "https://www.youtube-nocookie.com/embed/2PP0OrzS_k8",
      productId: 'MxG8Z',
      soundCloudDemoIds: ['1099457419']
    },
  ];
  
export default products;
