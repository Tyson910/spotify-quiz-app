<script lang="ts">
	import type { ActionData } from './$types';
	import Features from '@components/homepage/Features.svelte';
	import Hero from '@components/homepage/Hero.svelte';
	import ArtistListItem from '@components/homepage/ArtistListItem.svelte';
	export let form: ActionData;
</script>

<Hero isFormMissingArtist={form?.missing} />

{#if form?.artists}
	{#each form.artists as artist (artist.id)}
		<div class="mx-auto max-w-3xl">
			<ArtistListItem {artist} />
		</div>
	{/each}
{/if}
<Features />
