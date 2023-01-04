<script lang="ts">
	import MagnifyingGlass from '@components/icons/MagnifyingGlass.svelte';
	export let isFormMissingArtist: boolean = false;
	let userSearchInput = 'Beyonce';
</script>

<div class="isolate bg-white">
	<div class="relative px-6 lg:px-8">
		<div class="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-20">
			<div>
				<h1 class="text-4xl font-bold tracking-tight sm:text-center sm:text-5xl">
					Welcome To My Spotify Quiz App
				</h1>
				<p class="my-6 text-lg leading-8 text-gray-600 sm:text-center">
					Oh you're a fan? Prove it! Search and select an artist to get started
				</p>

				<form method="POST">
					<label for="artist-search" class="pl-2 text-sm font-medium text-gray-700"
						>Artist Search</label
					>
					<div class="mt-1 flex rounded-md shadow-sm">
						<div class="relative flex flex-grow items-stretch focus-within:z-10">
							<input
								type="search"
								bind:value={userSearchInput}
								name="artist-search"
								id="artist-search"
								required
								class="block w-full rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								placeholder="Usher"
							/>
						</div>
						<button
							type="submit"
							class="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
						>
							<MagnifyingGlass svgClasses="text-gray-400 stroke-2" />
							<span>Search</span>
						</button>
					</div>
					{#if isFormMissingArtist}<p class="pl-2 text-red-600">
							The artist field is required
						</p>{/if}
				</form>
			</div>
		</div>
	</div>
</div>
