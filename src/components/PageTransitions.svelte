<!-- src/component/PageTransitions.svelte -->
<script>
    import { fade, fly } from 'svelte/transition';
    export let refresh = '';
  </script>
  
  {#key refresh}
    <div
      in:fade="{{ y: -15, duration: 120, delay: 300}}"
      out:fade="{{ y: -15, duration: 120 }}" 
      >
      <slot/>
    </div>
  {/key}