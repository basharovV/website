import products from "./_products.js";

export async function load(req, res) {
  return {
    body: products,
  };
}
