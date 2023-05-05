<script>
	import Clip from './Clip.svelte'
	import { getContext } from 'svelte'
	import { DATA_KEY } from '../context'
	import Upload from './Upload.svelte'

	const context = getContext(DATA_KEY)
	const data = context.get()

	let clips = []

	data.subscribe(newData => {
		clips = newData.clips ?? []
	})
</script>

<table>
	<tr>
		<th>Clips</th>
		<th></th>
		<th></th>
	</tr>
	{#each clips as { name, url }}
		<Clip {name} {url} />
	{/each}
</table>
<br />
<Upload />

<style>
    table {
        width: 32em;
    }

    th {
        text-align: left;
    }
</style>
