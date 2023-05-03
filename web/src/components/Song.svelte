<script>
	export let name
	export let play
	export let stop
	export let isPlaying

	function onClick() {
		if (isPlaying) {
			stop()
		} else {
			play()
		}
	}
</script>

<button class="{isPlaying ? 'bg-green-500' : 'bg-gray-600'} font-bold text-2xl text-white py-7 rounded"
				on:click={onClick}>
	{name}{isPlaying ? " 🔊" : ""}
</button>
