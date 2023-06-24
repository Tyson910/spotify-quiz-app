<script lang="ts">
	import { onMount } from 'svelte';
	import { scaleLinear } from 'd3-scale';
	import { fade } from 'svelte/transition';
	import { interpolatePuOr, interpolatePlasma, interpolateViridis } from 'd3-scale-chromatic';
	import recentTracks from '$lib/assets/recent-tracks.json';

	let svg: SVGSVGElement;
	let width = 700;
	let height = 700;

	// TODO: make this responsive
	const padding = { top: 20, right: 60, bottom: 40, left: 25 };

	$: xAxisScale = scaleLinear()
		.domain([0, 1])
		.range([padding.left, width - padding.right]);
	$: xTicks = xAxisScale.ticks();
	$: yAxisScale = scaleLinear()
		.domain([0, 1])
		.range([height - padding.bottom, padding.top]);
	$: yTicks = yAxisScale.ticks();
</script>

<svg bind:this={svg} {width} {height} class="mt-20 lg:max-w-screen-2xl mx-auto overflow-visible">
	<!-- y axis -->
	<!-- draw a line at the midpoint -->
	<g class="axis y-axis">
		{#each yTicks as tick}
			<g class="tick tick-{tick}" transform="translate(0, {yAxisScale(tick)})">
				<line
					style="stroke: {tick == 0.5 && 'black'};"
					x1={tick + padding.left + 10}
					x2={width - padding.right + 10}
				/>
				<text x={'0%'} y="4" fill="gray">{tick}</text>
			</g>
		{/each}
		<text y={'0%'} x={'15%'} class="big-text">Sad Mood</text>
		<text y={'0%'} x={'60%'} class="big-text">Happy Mood</text>
	</g>

	<!-- x axis -->
	<g class="axis x-axis">
		{#each xTicks as tick}
			<g class="tick" transform="translate({xAxisScale(tick) + 10},0)">
				<!-- draw a thicker line at the midpoint -->
				<line
					y1={height - padding.bottom}
					y2={tick + padding.bottom / 2}
					style="stroke: {tick == 0.5 && 'black'};"
				/>
				<text y={'99%'}>{tick}</text>
			</g>
		{/each}
		<!-- <text y={height / 4} x={width + padding.right * 1.25} class="big-text">High Energy</text>
			<text y={height * 0.75} x={width + padding.right * 1.25} class="big-text">Low Energy</text> -->
	</g>

	<!-- data -->
	{#each recentTracks as track}
		<!-- Use the color scale to set the fill color -->
		{@const { energy, valence } = track.audio_features}
		{@const xAxisValue = xAxisScale(energy)}
		{@const yAxisValue = yAxisScale(valence)}

		<!-- increase bubble size and show tooltip on hover -->
		<g class="group">
			<circle
				r="8"
				cx={xAxisValue}
				cy={yAxisValue}
				class=" stroke-gray-500 group-hover:stroke-gray-800"
				fill-opacity={0.8}
				fill={`${interpolatePuOr(valence + energy + 0.25 - 1)}`}
			/>
			<g class="hidden group-hover:block">
				<!-- <rect x={xAxisValue} y={yAxisValue} width="200" height="100" fill="black" class="z-50" /> -->
				<text y={yAxisValue + 30} x={xAxisValue}>
					{track.name}
				</text>
				<text y={yAxisValue + 50} x={xAxisValue}>
					Valence: {valence}
				</text>
				<text y={yAxisValue + 70} x={xAxisValue}>
					Energy: {energy}
				</text>
			</g>
		</g>
	{/each}
</svg>

<style lang="postcss">
	line {
		@apply stroke-gray-200;
	}
	.x-axis text {
		text-anchor: middle;
	}
	.group text {
		text-anchor: middle;
	}
	.big-text {
		font-weight: 600;
	}
</style>
