<script context='module'>
	import SingletonAudio from '../singletonAudio'

	const singletonAudio = new SingletonAudio()
</script>

<script>
	import Song from './Song.svelte'
	import _ from 'lodash'
	import { onMount } from 'svelte'
	import { get } from '../../api'

	class WalkUpSong {
		constructor(name, url) {
			this.name = name
			this.url = url
		}
	}

	let walkUpSongs = []

	onMount(async () => {
		const songs = await get('/songs')
		walkUpSongs = _.orderBy(songs.map(({ name, url }) => new WalkUpSong(name, url)), [x => x.name.toLowerCase()])
	})
</script>

<div class='grid grid-cols-12 gap-6'>
	<div class='col-span-12 grid grid-cols-12 gap-6'>
		{#each walkUpSongs as { name, url }}
			<Song {name} {url} {singletonAudio} />
		{/each}
	</div>
</div>
<audio bind:this={singletonAudio.audio}></audio>
