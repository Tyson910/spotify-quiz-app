# Spotify Data Insights Web App

This web app visualizes Spotify data insights based on a user's recently played tracks. It utilizes the Spotify Web API to retrieve the necessary data and presents it in visually appealing plots.

## Features

- **Recently Played Tracks**: Fetches the user's recently played tracks from the Spotify API.
- **Popularity vs. Valence**: Displays a bubble chart that represents the popularity and valence (positiveness) of the tracks.
- **Dynamic Bubble Sizes**: The size of each bubble in the chart corresponds to the number of times the user played a particular track.
- **Interactive**: Users can hover over the bubbles to view detailed information about each track.

## Prerequisites

- Node.js (version 18.9.0)
- Spotify Developer Account (to obtain API credentials)

## Getting Started

1. Clone the repository: `git clone https://github.com/tyson-910/spotify-quiz-app.git`
2. Navigate to the project directory: `cd spotify-quiz-app`
3. Install dependencies: `npm install`
4. Configure API credentials: Rename `.env.example` file to `.env` and update the values with your Spotify API credentials.
5. Start the development server: `npm run dev`
6. Open the web app in your browser: `http://localhost:5173`

## Usage

1. Log in to the web app using your Spotify account.
2. Once logged in, the web app will retrieve your recently played tracks.
3. The bubble chart will be displayed, showing the relationship between track popularity, valence, and the number of plays.
4. Hover over the bubbles to view additional details about each track.
5. Explore the different insights and patterns in your music listening habits.

## Technologies Used

- HTML, CSS, JavaScript
- SvelteKit & TailwindCSS
- Spotify Web API (Data retrieval)
- Plotting library (e.g., Plotly, D3.js)

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api/)
- [SvelteKit Documentation](https://kit.svelte.dev/)

