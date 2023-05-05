<script>
	import { del } from '../../../api'
	import { getContext } from 'svelte'
	import { SINGLETON_AUDIO_KEY } from '../../../singletonAudio'
	import { DATA_KEY } from '../context'

	export let name
	export let url

	let isPlaying

	const singletonAudio = getContext(SINGLETON_AUDIO_KEY).get()

	singletonAudio.urlStore.subscribe(newUrl => {
		isPlaying = newUrl === url
	})

	const { refresh } = getContext(DATA_KEY)

	const deleteSong = async () => {
		const shouldDelete = confirm(`Are you sure you want to delete "${name}"?`)
		if (!shouldDelete) {
			return
		}
		await del(`/manage/clip/${name}`)
		refresh()
	}
</script>

<tr class='{isPlaying && "font-semibold"} even:bg-gray-200 h-10'>
	<td>{name}</td>
	<td>
		<button on:click={() => singletonAudio.toggle(url)}>
			{isPlaying ? 'Stop' : 'Preview'}
		</button>
	</td>
	<td>
		<button on:click={deleteSong}>Delete</button>
	</td>
</tr>

