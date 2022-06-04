// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const config = {
  kit: {
    adapter: adapter()
  },
  preprocess: preprocess()
  // ...other svelte options
};

export default config;
