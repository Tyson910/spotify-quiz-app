<script lang="ts">
	import MultipleChoiceButton from '@components/quiz/MultipleChoiceButton.svelte';
	import AudioPlayer from '@components/quiz/AudioPlayer.svelte';
	import classnames from 'classnames';
	import type { PageServerData } from './$types';
	import { generateTriviaQuestions, shuffleArray } from '$lib/utils/game-helpers';
	type ValidAnswerStatus = '' | 'Correct' | 'Incorrect';

	export let data: PageServerData;

	const { artistTopTracks } = data;
	const triviaQuestions = generateTriviaQuestions(artistTopTracks);
	let questionNumber = 0;
	let answerStatus: ValidAnswerStatus = '';
	let userGuess: null | SpotifyApi.TrackObjectFull['id'] = null;

	$: correctAnswers = triviaQuestions.filter(({ guessedCorrectly }) => guessedCorrectly).length;
	$: currentTriviaQuestion = triviaQuestions[questionNumber];
	let triviaQuestionOptions: SpotifyApi.TrackObjectFull[];
	$: if (userGuess) {
		triviaQuestionOptions = [...triviaQuestionOptions.filter((option) => option.id == userGuess)];
	}
	// only shuffle array if game hasn't ended yet
	else if (questionNumber < 10) {
		triviaQuestionOptions = shuffleArray([
			...currentTriviaQuestion.decoyTracks,
			currentTriviaQuestion.correctTrack
		]);
	}

	function handleClick(trackID: SpotifyApi.TrackObjectFull['id']) {
		userGuess = trackID;
		if (trackID == currentTriviaQuestion.correctTrack.id) {
			triviaQuestions[questionNumber].guessedCorrectly = true;
			// change button text/style if answer is correct/incorrect
			answerStatus = 'Correct';
		} else {
			answerStatus = 'Incorrect';
		}

		setTimeout(() => {
			answerStatus = '';
			questionNumber += 1;
			userGuess = null;
		}, 1000);
	}
</script>

<main class="py-20 mx-auto max-w-screen-lg space-y-10">
	{#if questionNumber <= 9 && !!currentTriviaQuestion}
		<!-- Re-render the audioplayer component each time questionNumber changes -->
		{#key questionNumber}
			<div class="text-center prose max-w-none ">
				<h1>Can you guess the name of this song?</h1>
				<p>You only get to play the song twice! Make each listen count</p>
				<!-- <p>{currentTriviaQuestion.correctTrack.name}</p> -->
				{#if questionNumber > 0}
					<p>{correctAnswers} correct answer{correctAnswers > 1 ? 's' : ''}</p>
				{/if}
			</div>
			<AudioPlayer
				track={currentTriviaQuestion.correctTrack}
				audioLink={currentTriviaQuestion.correctTrack?.preview_url}
			/>
		{/key}
		<div class="prose max-w-none mt-10 mb-8">
			<p class="text-center">Question {questionNumber + 1} out of 10</p>
		</div>
		<div class="flex flex-col gap-y-5">
			{#each triviaQuestionOptions as option (option.id)}
				<div
					id={option.id}
					class={classnames(
						answerStatus == 'Incorrect' && 'text-red-500',
						answerStatus == 'Correct' && 'text-green-400'
					)}
				>
					<MultipleChoiceButton
						on:click={() => handleClick(option.id)}
						classes={!answerStatus ? 'text-gray-600 hover:text-gray-400' : ''}
						>{option.name}</MultipleChoiceButton
					>
					{#if answerStatus.length > 0 && userGuess}
						<p class="text-center pt-3">
							{answerStatus}
						</p>
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<div class="flex flex-col items-center gap-y-10">
			<p class="text-3xl">
				{correctAnswers > 7
					? "Congrats, you passed the 'real fan' test!"
					: `${correctAnswers} correct answer${
							correctAnswers == 1 ? '' : 's'
					  }??? Not your best work :/`}
			</p>
			<MultipleChoiceButton
				on:click={() => location.reload()}
				classes={'text-green-400 hover:text-green-500'}
			>
				Click to Replay
			</MultipleChoiceButton>
			<a
				href="/"
				class={classnames(
					'py-2 px-5 text-center',
					'flex justify-center items-center max-w-sm w-full mx-auto',
					'rounded-full border border-current',
					'hover:transition-colors hover:duration-700',
					'focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2',
					'text-green-400 hover:text-green-500'
				)}
			>
				Play with a different artist</a
			>
		</div>
	{/if}
</main>
