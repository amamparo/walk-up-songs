<script>
  import { createEventDispatcher } from "svelte";

  let clazz;
  export { clazz as class };

  const dispatch = createEventDispatcher();
</script>

<button class="rounded-lg p-4 border-4 font-semibold text-2xl {clazz}" on:click={() => dispatch('click', {})}>
  <slot />
</button>
