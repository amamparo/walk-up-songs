<script>
  import Home from "../components/home/Home.svelte";
  import Manage from "../components/manage/Manage.svelte";
  import NotFound from "../components/NotFound.svelte";
  import Router from "svelte-spa-router";

  const routes = {
    "/": Home,
    "/manage": Manage,
    "*": NotFound
  };
</script>

<Router {routes} />
