// svelte.config.js
import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

import mdsvexConfig from "./mdsvex.config.js";
import { mdsvex } from "mdsvex";

const config = {
    extensions: [".svelte", ...mdsvexConfig.extensions],

    kit: {
        prerender: {
            handleMissingId: "ignore"
        },
        adapter: adapter({
            // default options are shown
            pages: "build",
            assets: "build",
            fallback: undefined,
            precompress: true
        })
    },
    preprocess: [mdsvex(mdsvexConfig), preprocess()]

    // ...other svelte options
};

export default config;
