<script lang="ts">
	export let artist: SpotifyApi.ArtistObjectFull;
</script>

<li class="flex items-center justify-between space-x-3 py-4">
	<div class="flex min-w-0 flex-1 items-center space-x-3">
		<div class="flex-shrink-0">
			{#if !!artist?.images?.[0]?.url}
			<img class="h-20 w-20" loading="lazy" src={artist.images[0].url} alt={artist?.name}  />
			{/if}
		</div>
		<div class="min-w-0 flex-1">
			<p class="truncate text-sm font-medium text-gray-900">
				{artist.name}
			</p>
		</div>
	</div>
	<div class="flex-shrink-0 group">
		<a
			href={`/solo-game/${artist.id}/${artist.name}`}
			class={`py-2 px-5 inline-flex items-center 
			 rounded-full border border-current hover:bg-current
			 hover:transition-colors hover:duration-700
			 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
			 `}
		>
			<span class="text-sm font-medium group-hover:text-gray-50">
				Play {artist.name} Quiz
			</span>
		</a>
	</div>
</li>
