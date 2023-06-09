<script lang="ts">
	export let track: SpotifyApi.TrackObjectFull;
	export let audioLink: SpotifyApi.TrackObjectFull['preview_url'];

	// only allow one play clicks
	let numberOfPlays = 1;
	const maxNumOfPlays = 2;
	let audioElement: HTMLAudioElement;

	$: isPlayingMusic = audioElement?.paused;

	function playMusic() {
		audioElement.play();
		isPlayingMusic = true;
		numberOfPlays += 1;
	}
</script>

<div class="flex flex-col items-center ">
	<audio
		src={numberOfPlays < maxNumOfPlays ? audioLink : null}
		on:ended={() => (isPlayingMusic = false)}
		on:pause={() => (isPlayingMusic = false)}
		bind:this={audioElement}
	/>
	<span class="isolate inline-flex gap-x-6">
		<button
			type="button"
			on:click|once={playMusic}
			disabled={numberOfPlays == maxNumOfPlays}
			class:cursor-not-allowed={numberOfPlays == maxNumOfPlays}
			class:bg-gray-50={numberOfPlays == maxNumOfPlays}
			class:bg-gray-100={isPlayingMusic}
			class:animate-pulse={isPlayingMusic}
			class="inline-flex gap-x-3 items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
		>
			{#if numberOfPlays == 0 || isPlayingMusic}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
					/>
				</svg>
				{isPlayingMusic ? 'Playing' : 'Play'}
			{:else if numberOfPlays == maxNumOfPlays}
				No more plays
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
					/>
				</svg>
				Replay
			{/if}
		</button>

		<button
			type="button"
			on:click={() => audioElement.pause()}
			class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
			</svg>
			Pause
		</button>
	</span>
</div>
