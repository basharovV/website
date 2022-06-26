
import hljs from "highlight.js";
import hljs_svelte from "highlightjs-svelte";
import { escapeSvelte } from 'mdsvex';
hljs_svelte(hljs);

function highlighter(code, lang) {
  const { value: highlighted } = lang
    ? hljs.highlight(lang, code)
    : hljs.highlightAuto(code);
  return  escapeSvelte(`<pre><code>${highlighted}</code></pre>`);
}

export default {
  extensions: [".md"],
  highlight: {
    highlighter: highlighter,
  },
};
