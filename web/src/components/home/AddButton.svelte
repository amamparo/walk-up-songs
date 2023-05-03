<script>
  import { push } from "svelte-spa-router";
</script>

<button class="rounded-lg text-green-400 p-10 border-green-400 border-4 w-fill
col-span-12 md:col-start-5 md:col-end-9 xl:col-start-6 xl:col-end-8"
        on:click={() => push('/add')}>
  Add Song
</button>
