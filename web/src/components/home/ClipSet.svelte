<script>
	import Clip from './Clip.svelte'
	export let clips
	let clazz;
	export { clazz as class };
</script>

<div class='{clazz} grid grid-cols-12 gap-6'>
	<div class='col-span-12 grid grid-cols-12 gap-6'>
		{#each clips as { name, url }}
			<Clip {name} {url} />
		{/each}
	</div>
</div>
