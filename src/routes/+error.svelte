<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export function load({ error, status }) {
    return {
      props: {
        title: `${status}: ${error.message}`,
		status: status
      },
    };
  }
</script>

<script>
  export let title;
  export let status;
</script>

<svelte:head>
	<title>Error! {status}</title>
</svelte:head>

<h1>{title}</h1>
<p>Something went horribly wrong...or you just landed on a page that doesn't exist</p>
<small>You might as well leave a comment</small>
