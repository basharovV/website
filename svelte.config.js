// svelte.config.js
import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
import mdsvexConfig from "./mdsvex.config.js";
import { mdsvex } from "mdsvex";

const config = {
  extensions: [".svelte", ...mdsvexConfig.extensions],

  kit: {
    adapter: adapter({
      // default options are shown
      pages: "build",
      assets: "build",
      fallback: null,
      precompress: true,
    }),
    prerender: {
      default: true,
    },
    trailingSlash: "never",
    vite: {
      optimizeDeps: {
        include: ["highlight.js", "highlight.js/lib/core"],
      },
      build: {
        sourcemap: false,
      },
      server: {
        fs: {
          allow: ['./']
        }
      }
    },
  },
  preprocess: [mdsvex(mdsvexConfig), preprocess()],
  // ...other svelte options
};

export default config;
