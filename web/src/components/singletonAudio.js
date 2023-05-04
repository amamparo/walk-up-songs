import { writable } from 'svelte/store'

export default class SingletonAudio {
	constructor() {
		this.urlStore = writable('')
		this.audio = null

		this.urlStore.subscribe(newUrl => {
			if (this.audio) {
				if (this.audio.src === newUrl) {
					this.#stop()
				} else {
					this.#start(newUrl)
				}
			}
		})
	}

	toggle(url) {
		this.urlStore.update(currentValue => currentValue === url ? '' : url)
	}

	#stop() {
		this.audio.pause()
		this.audio.currentTime = 0
		this.urlStore.set('')
	}

	#start(url) {
		this.audio.src = url
		this.audio.play()
		this.audio.onended = () => {
			this.urlStore.set('')
		}
	}
}
