// svelte.config.js
import adapter from "@sveltejs/adapter-vercel";
import preprocess from "svelte-preprocess";

const config = {
  kit: {
    adapter: adapter(),
    vite: {
      optimizeDeps: {
        include: ["highlight.js", "highlight.js/lib/core"],
      },
      build: {
        sourcemap: false,
      },
      assetsInclude: [".md"],
      publicDir: "static",
      server: {
        fs: {
          // Allow serving files from one level up to the project root
          allow: ["/src", "/static", "/static/posts"],
        },
      },
    },
  },
  preprocess: preprocess(),
  // ...other svelte options
};

export default config;
