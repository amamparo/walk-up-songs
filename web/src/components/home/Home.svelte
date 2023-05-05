<script>
	import _ from 'lodash'
	import { getContext, onMount } from 'svelte'
	import { get } from '../../api'
	import { SINGLETON_AUDIO_KEY } from '../../singletonAudio'
	import ClipSet from './ClipSet.svelte'

	class Clip {
		constructor(name, url) {
			this.name = name
			this.url = url
		}
	}

	let walkUpSongs = []
	let extraClips = []

	onMount(async () => {
		const { assignments, extras } = await get('/clips')
		walkUpSongs = _.orderBy(assignments.map(({ name, url }) => new Clip(name, url)), [x => x.name.toLowerCase()])
		extraClips = _.orderBy(extras.map(({ name, url }) => new Clip(name, url)), [x => x.name.toLowerCase()])
	})

	const singletonAudio = getContext(SINGLETON_AUDIO_KEY).get()
</script>

<ClipSet clips={walkUpSongs} class='mb-6' />
{#if extraClips.length}
	<span class='text-center text-4xl font-bold'>
		<h1>Extras</h1>
	</span>
	<ClipSet clips={extraClips} class='mt-6' />
{/if}
<audio bind:this={singletonAudio.audio}></audio>
