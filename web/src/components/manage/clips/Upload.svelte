<script context='module'>
	const MAX_FILE_SIZE_MB = 5
</script>

<script>
	import { get } from '../../../api'
	import { getContext } from 'svelte'
	import { DATA_KEY } from '../context'

	let isUploading = false

	const { refresh } = getContext(DATA_KEY)

	function validate(file) {
		if (!file.type.startsWith('audio')) {
			window.alert('Must be an audio file')
			return false
		}
		if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
			window.alert(`File must be smaller than ${MAX_FILE_SIZE_MB}mb`)
			return false
		}
		return true
	}

	const upload = async (name, file) => {
		if (!validate(file)) {
			return
		}
		const extension = file.name.split('.').pop()
		const { url } = await get(`/manage/upload/${name}.${extension}`)
		await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'audio/*'
			},
			body: file
		})
	}

	const doUpload = async ({ target }) => {
		isUploading = true
		try {
			const data = new FormData(target)
			await upload(data.get('name'), data.get('file'))
		} finally {
			target.reset()
			isUploading = false
			refresh()
		}
	}
</script>

<form on:submit|preventDefault={doUpload}>
	<input type='text' name='name' placeholder='Name' required>
	<input type='file' name='file' required />
	<button type='submit'>{isUploading ? 'Uploading...' : 'Upload'}</button>
</form>
