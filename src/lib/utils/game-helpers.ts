interface GenerateArrayOfRandomNumsOptions {
  min?: number;
  max?: number;
  excludeTheseNumbers?: number[];
}
function generateArrayOfRandomNums(
  desiredArrayLength = 10,
  options: GenerateArrayOfRandomNumsOptions,
): number[] {
  const { min, max, excludeTheseNumbers } = options;
  let trackIndexNumArr: number[] = [];
  let randomNum: number;
  while (trackIndexNumArr.length < desiredArrayLength) {
    randomNum = getRandomNumInclusive(
      min || 0,
      max || desiredArrayLength,
    );
    if (excludeTheseNumbers?.includes(randomNum)) continue;
    trackIndexNumArr = [...new Set([...trackIndexNumArr, randomNum])];
  }
  return trackIndexNumArr;
}

function getRandomNumInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

interface TriviaQuestion {
  question: number;
  guessedCorrectly: boolean;
  correctTrack: SpotifyApi.TrackObjectFull;
  decoyTracks: SpotifyApi.TrackObjectFull[];
}
function generateTriviaQuestions(
  tracks: SpotifyApi.TrackObjectFull[],
): TriviaQuestion[] {
  const triviaQuestions: TriviaQuestion[] = generateArrayOfRandomNums(10, {
    min: 0,
    max: tracks.length,
  })
    .map((randNum, i) => {
      const correctTrack = tracks[randNum];
      const decoyTracks = generateArrayOfRandomNums(3, {
        min: 0,
        max: tracks.length,
        // prevent any decoyTracks from being set to correctTrack
        excludeTheseNumbers: [randNum],
      }).map((
        decoyNum,
      ) => tracks[decoyNum]);

      return {
        question: i + 1,
        guessedCorrectly: false,
        correctTrack,
        decoyTracks,
      };
    });

  return triviaQuestions;
}

function shuffleArray<Type>(array: Type[]) {
  let top = array.length;
  if (top) {
    while (--top) {
      const current = Math.floor(Math.random() * (top + 1));
      const tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  }

  return array;
}

export {
  generateArrayOfRandomNums,
  generateTriviaQuestions,
  getRandomNumInclusive,
  shuffleArray
};
