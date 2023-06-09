<script lang="ts">
	import classnames from 'classnames';
	export let trackName = '';
	export let classes = '';
</script>

<button
	on:click
	class={classnames(
		'py-2 px-5 text-center',
		'flex justify-center items-center max-w-sm w-full mx-auto',
		'rounded-full border border-current',
		'hover:transition-colors hover:duration-700',
		'focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2',
		classes
	)}
>
	{trackName}
	<slot />
</button>
