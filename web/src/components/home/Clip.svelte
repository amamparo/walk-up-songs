<script>
	import { getContext } from 'svelte'
	import { SINGLETON_AUDIO_KEY } from '../../singletonAudio'

	export let name
	export let url

	let isPlaying = false

	const singletonAudio = getContext(SINGLETON_AUDIO_KEY).get()

	singletonAudio.urlStore.subscribe(newUrl => {
		isPlaying = newUrl === url
	})

	const onClick = () => {
		singletonAudio.toggle(url)
	}
</script>

<button class="{isPlaying ? 'bg-green-500' : 'bg-gray-600'}
font-semibold text-2xl text-white py-10 rounded col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
				on:click={onClick}>
	{name}{isPlaying ? " 🔊" : ""}
</button>
