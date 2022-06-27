<!-- PageTransition.svelte -->
<script>
  import { fly } from "svelte/transition";
  export let url = "";
  const pageTransitionDuration = 80;
</script>

{#key url}  
  <div
    in:fly={{ y: -0, duration: pageTransitionDuration, delay: pageTransitionDuration }}
  >
    <slot />
  </div>
{/key}

<style>
  .transition-outer {
    display: grid;
    grid-template: 1fr 1fr;
  }
  .transition-inner {
    grid-row: 1;
    grid-column: 1;
  }
</style>
