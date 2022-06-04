// svelte.config.js
import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

const config = {
  kit: {
    adapter: adapter(),
    vite: {
      optimizeDeps: {
        include: ["highlight.js", "highlight.js/lib/core"],
      },
    },
  },
  preprocess: preprocess(),
  // ...other svelte options
};

export default config;
