<script>
  import Song from './Song.svelte';
  import _ from 'lodash';
  import songs from './songs.json'

  let audio

  class WalkUpSong {
    constructor(name, track) {
      this.name = name
      this.track = track
    }

    getKey() {
      return `${this.name.toLowerCase()}-${this.track}`
    }
  }

  const walkUpSongs = _.orderBy(songs.map(([name, track]) => new WalkUpSong(name, track)), [x => x.name.toLowerCase()])

  let nowPlaying = null

  $: {
    if (audio != null) {
      if (nowPlaying == null) {
        audio.pause()
        audio.currentTime = 0
      } else {
        audio.src = `/audio/${nowPlaying.track}`
        audio.play()
        audio.onended = () => {
          nowPlaying = null
        }
      }
    }
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {#each walkUpSongs as walkUpSong}
        <Song name={walkUpSong.name} play={() => nowPlaying = walkUpSong}
              stop={() => nowPlaying = null}
              isPlaying={nowPlaying && nowPlaying.getKey() === walkUpSong.getKey()}/>
    {/each}
</div>
<audio bind:this={audio}></audio>
