import products from "./_products.js";

export async function get(req, res) {
  return {
    body: products,
  };
}
