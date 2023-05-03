<script>
  import Soundboard from "../components/Soundboard.svelte";
  import Add from "../components/Add.svelte";
  import NotFound from "../components/NotFound.svelte";
  import Router from "svelte-spa-router"

  const routes = {
    '/': Soundboard,
    '/add': Add,
    '*': NotFound,
  }
</script>

<Router {routes}/>
