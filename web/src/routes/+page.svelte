<script>
  import Home from "../components/home/Home.svelte";
  import Add from "../components/add/Add.svelte";
  import NotFound from "../components/NotFound.svelte";
  import Router from "svelte-spa-router";

  const routes = {
    "/": Home,
    "/add": Add,
    "*": NotFound
  };
</script>

<Router {routes} />
