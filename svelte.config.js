// svelte.config.js
import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

import mdsvexConfig from "./mdsvex.config.js";
import { mdsvex } from "mdsvex";
function isWebComponentSvelte(code) {
    const svelteOptionsIdx = code.indexOf("<svelte:options ");
    if (svelteOptionsIdx < 0) {
        return false;
    }
    const tagOptionIdx = code.indexOf("customElement=", svelteOptionsIdx);
    const svelteOptionsEndIdx = code.indexOf(">", svelteOptionsIdx);
    return (
        tagOptionIdx > svelteOptionsIdx && tagOptionIdx < svelteOptionsEndIdx
    );
}
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
    preprocess: [mdsvex(mdsvexConfig), preprocess()],
    vitePlugin: {
        experimental: {
            dynamicCompileOptions({ code }) {
                if (isWebComponentSvelte(code)) {
                    return {
                        customElement: true
                    };
                }
            }
        }
    }

    // ...other svelte options
};

export default config;
