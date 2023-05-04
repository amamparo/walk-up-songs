<script>
	import { del } from '../../api'
	import { createEventDispatcher } from 'svelte'

	export let name
	export let url
	export let singletonAudio

	let isPlaying

	singletonAudio.urlStore.subscribe(newUrl => {
		isPlaying = newUrl === url
	})

	const dispatch = createEventDispatcher()

	const deleteSong = async () => {
		const shouldDelete = confirm(`Are you sure you want to delete "${name}"?`)
		if (!shouldDelete) {
			return
		}
		await del(`/song/${name}`)
		dispatch('delete')
	}
</script>

<tr class={isPlaying ? 'font-semibold' : ''}>
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

