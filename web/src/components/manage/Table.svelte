<script context='module'>
	import SingletonAudio from '../singletonAudio'

	const singletonAudio = new SingletonAudio()
</script>

<script>
	import { get } from '../../api'
	import { onMount } from 'svelte'
	import TableRow from './TableRow.svelte'

	let songs = []

	export const refresh = async () => {
		songs = await get('/songs')
	}

	onMount(() => {
		refresh()
	})
</script>

<table>
	<tr>
		<th>Name</th>
		<th></th>
		<th></th>
	</tr>
	{#each songs as { name, url }}
		<TableRow {name} {url} {singletonAudio} on:delete={refresh}/>
	{/each}
</table>
<audio bind:this={singletonAudio.audio}></audio>

<style>
	table {
			width: 32em;
	}
	th {
			text-align: left;
	}
</style>
