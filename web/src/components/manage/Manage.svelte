<script>
	import Clips from './clips/Clips.svelte'
	import { getContext, onMount, setContext } from 'svelte'
	import { SINGLETON_AUDIO_KEY } from '../../singletonAudio'
	import { get } from '../../api'
	import { DATA_KEY } from './context'
	import { writable } from 'svelte/store'
	import Assignments from './assignments/Assignments.svelte'

	const singletonAudio = getContext(SINGLETON_AUDIO_KEY).get()

	let data = writable({})

	const refresh = async () => {
		data.set(await get('/manage'))
	}

	setContext(DATA_KEY, {
		get: () => data,
		refresh
	})

	onMount(refresh)
</script>

<Clips />
<br />
<Assignments />


<audio bind:this={singletonAudio.audio}></audio>
