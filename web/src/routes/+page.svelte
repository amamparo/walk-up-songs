<script>
	import Home from '../components/home/Home.svelte'
	import Manage from '../components/manage/Manage.svelte'
	import NotFound from '../components/NotFound.svelte'
	import Router from 'svelte-spa-router'
	import { setContext } from 'svelte'
	import SingletonAudio, { SINGLETON_AUDIO_KEY } from '../singletonAudio'

	const singletonAudio = new SingletonAudio()
	setContext(SINGLETON_AUDIO_KEY, {
		get: () => singletonAudio
	})

	const routes = {
		'/': Home,
		'/manage': Manage,
		'*': NotFound
	}

</script>

<Router {routes} />
