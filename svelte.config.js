// svelte.config.js
import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

const config = {
  kit: {
    adapter: adapter({
      // default options are shown
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: true,
    }),
    prerender: {
      default: true,
    },
    vite: {
      optimizeDeps: {
        include: ["highlight.js", "highlight.js/lib/core"],
      },
      build: {
        sourcemap: false,
      },
      assetsInclude: [".md"],
    },
  },
  preprocess: preprocess(),
  // ...other svelte options
};

export default config;
