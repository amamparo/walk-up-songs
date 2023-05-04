<script>
	import Upload from './Upload.svelte'
	import Table from './Table.svelte'

	let onUpload
</script>

<Table bind:refresh={onUpload} />
<br />
<br />
<Upload on:upload={onUpload} />
