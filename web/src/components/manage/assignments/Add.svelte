<script>
	import { post } from '../../../api'
	import { getContext } from 'svelte'
	import { DATA_KEY } from '../context'

	const { refresh, get } = getContext(DATA_KEY)
	const data = get()

	let clips = []

	data.subscribe(newData => {
		const usedClipNames = (newData.assignments ?? []).map(x => x.clipName)
		clips = (newData.clips ?? []).filter(clip => !usedClipNames.includes(clip.name))
	})

	const doAdd = async ({ target }) => {
		const formData = new FormData(target)
		await post('/manage/assignment', {
			name: formData.get('name'),
			clipName: formData.get('clipName')
		})
		target.reset()
		await refresh()
	}
</script>

<form on:submit|preventDefault={doAdd}>
	<input type='text' name='name' placeholder='Name' required>
	<select name='clipName' required>
		{#each clips as { name }}
			<option value={name}>{name}</option>
		{/each}
	</select>
	<button type='submit'>Add</button>
</form>
