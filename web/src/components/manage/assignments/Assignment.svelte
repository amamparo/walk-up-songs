<script>
	import { del } from '../../../api'
	import { getContext } from 'svelte'
	import { DATA_KEY } from '../context'

	export let name
	export let clipName

	const { refresh } = getContext(DATA_KEY)

	const deleteAssignment = async () => {
		const shouldDelete = confirm(`Are you sure you want to delete "${name}"?`)
		if (!shouldDelete) {
			return
		}
		await del(`/manage/assignment/${name}`)
		refresh()
	}
</script>

<tr class='even:bg-gray-200 h-10'>
	<td>{name}</td>
	<td>{clipName}</td>
	<td>
		<button on:click={deleteAssignment}>Delete</button>
	</td>
</tr>

