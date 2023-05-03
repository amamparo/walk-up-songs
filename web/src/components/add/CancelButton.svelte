<script>
  import { push } from "svelte-spa-router";
  import ActionButton from "../ActionButton.svelte";
</script>

<ActionButton class="border-red-500 text-red-500" on:click={() => push('/')}>
  Cancel
</ActionButton>
