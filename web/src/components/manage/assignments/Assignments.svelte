<script>
	import { getContext } from 'svelte'
	import { DATA_KEY } from '../context'
	import Assignment from './Assignment.svelte'
	import Add from './Add.svelte'

	const context = getContext(DATA_KEY)
	const data = context.get()

	let assignments = []

	data.subscribe(newData => {
		assignments = newData.assignments ?? []
	})
</script>

<h5>Assignments</h5>
<table>
	<tr>
		<th>Name</th>
		<th>Clip</th>
		<th></th>
	</tr>
	{#each assignments as { name, clipName }}
		<Assignment {name} {clipName} />
	{/each}
</table>
<br/>
<Add />

<style>
    table {
        width: 32em;
    }

    th {
        text-align: left;
    }
</style>
