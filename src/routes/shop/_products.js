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
    longDescription:
      "<h4>Features</h4><ul><li>Kontakt 5+ instrument</li><li>73 keys</li><li>511 samples. 6-10 velocity layers</li><li>Key press + release noises</li></ul><small>Disclaimer: I don't have any association or endorsement by the Rhodes brand. Any references to the Rhodes brand are provided for description purposes only.</small>",
    image: "product-assets/rhodesian-keys/rhodesian-keys-bg.png",
    bannerImage: "product-assets/rhodesian-keys/banner.png",
    name: "Rhodesian Keys (Edition I)",
    price: "",
    url: "products/rhodesian-keys",
    tags: ["Kontakt instrument", "Sample library"],
    size: "682.9 MB",
    video: "https://www.youtube-nocookie.com/embed/2PP0OrzS_k8",
    productId: "MxG8Z",
    soundCloudDemoIds: ["1099457419"],
    color: "#00bbff",
    paymentDescription: "🦊 Thanks Internet stranger! You can take this product for free, or pay what you want. If you have any feedback, email me on contact@vyacheslavbasharov.com"
  },
  {
    id: "not-alone-in-space",
    description:
      "A sample pack full of metallic, atmospheric alien and spaceship effects designed to make you want to stay on planet Earth.",
    longDescription:
      "<h4>Features</h4><ul><li>10 hand-crafted samples</li><li>WAV, uncompressed</li><li>Live steel tongue drum used for metallic sounds</li></ul>",
    image: "product-assets/not-alone-in-space/square.png",
    bannerImage: "product-assets/not-alone-in-space/banner.png",
    name: "*NOT ALONE IN SPACE",
    price: "",
    url: "products/not-alone-in-space",
    tags: ["Sample pack", "Space FX"],
    size: "19.8 MB",
    video: "https://www.youtube-nocookie.com/embed/2PP0OrzS_k8",
    productId: "l19Z5",
    soundCloudDemoIds: ["1102572859"],
    color: "#E04C4C",
    paymentDescription: "Thanks! I hope you can use the samples in your projects. If you have any feedback, email me on contact@vyacheslavbasharov.com"
  },
];

export default products;
