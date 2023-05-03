<script>
  import Song from "./Song.svelte";
  import _ from "lodash";
  import songs from "./songs.json";
  import { link } from "svelte-spa-router";

  let audio;

  class WalkUpSong {
    constructor(name, trackSlug) {
      this.name = name;
      this.track = `${trackSlug}.mp3`;
    }

    getKey() {
      return `${this.name.toLowerCase()}-${this.track}`;
    }
  }

  const walkUpSongs = _.orderBy(songs.map(([name, slug]) => new WalkUpSong(name, slug)), [x => x.name.toLowerCase()]);

  let nowPlaying = null;

  $: {
    if (audio != null) {
      if (nowPlaying == null) {
        audio.pause();
        audio.currentTime = 0;
      } else {
        audio.src = `/audio/${nowPlaying.track}`;
        audio.play();
        audio.onended = () => {
          nowPlaying = null;
        };
      }
    }
  }
</script>

<div class="col-span-12 grid grid-cols-12 gap-7">
  {#each walkUpSongs as walkUpSong}
    <Song name={walkUpSong.name} play={() => nowPlaying = walkUpSong}
          stop={() => nowPlaying = null}
          isPlaying={nowPlaying && nowPlaying.getKey() === walkUpSong.getKey()} />
  {/each}
</div>
<audio bind:this={audio}></audio>
