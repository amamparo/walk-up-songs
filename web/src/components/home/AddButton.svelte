<script>
  import { push } from "svelte-spa-router";
  import ActionButton from "../ActionButton.svelte";
</script>

<ActionButton class="text-green-400 border-green-400 col-span-12 md:col-start-5 md:col-end-9 xl:col-start-6 xl:col-end-8"
        on:click={() => push('/add')}>
  Add
</ActionButton>
