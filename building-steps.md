# Instructions

Follow these step-by-step instructions to implement the required features for the Spotify Data Insights web app:

## Feature 1: User Authentication

- [x] **Description**: Implement user authentication to allow users to log in with their Spotify account.

**Steps**:

1. [x] Set up a Spotify Developer Account if you don't have one already.
2. [x] Create a new application in the Spotify Developer Dashboard to obtain the necessary API credentials (client ID and client secret).
3. [x] Set up the backend authentication server using a framework like Express.js or Flask.
4. [x] Implement the login route on the backend to initiate the Spotify authorization flow.
5. [x] Redirect the user to the Spotify Accounts service for authentication.
6. [x] Handle the callback route on the backend to exchange the authorization code for an access token.
7. [x] Store the access token securely for future API requests on behalf of the user.

## Feature 2: Fetch Recently Played Tracks

- [ ] **Description**: Retrieve the user's recently played tracks from the Spotify API.

**Steps**:

1. [x] Use the user's access token obtained during authentication to make requests on behalf of the user.
2. [x] Implement the logic to fetch the recently played tracks from the Spotify Web API.
3. [ ] Handle any necessary pagination to retrieve all the tracks if the number of tracks exceeds the API's limit.
4. [x] Get Audio Features for each recently played track
5. [x] Merge the two datasets into one array
6. [x] Store the retrieved track data in a format suitable for further processing and visualization.

## Feature 3: Popularity vs. Valence Bubble Chart

- [ ] **Description**: Create a bubble chart that represents the popularity and valence of the user's recently played tracks.

**Steps**:

1. [ ] Set up a plotting library (e.g., Plotly, D3.js) to create interactive visualizations.
2. [ ] Extract the required data from the recently played tracks dataset (e.g., popularity, valence).
3. [ ] Map the popularity to the bubble sizes, valence to the y-axis, and any additional desired parameters (e.g., color) for the bubbles.
4. [ ] Generate the bubble chart using the plotting library and display it in the web app's user interface.
5. [ ] Implement interactivity such as tooltips or hover effects to provide additional details about each track.

## Feature 4: Dynamic Bubble Sizes

- [ ] **Description**: Adjust the size of the bubbles in the chart based on the number of times the user played each track.

**Steps**:

1. [ ] Calculate the count or frequency of plays for each track from the recently played tracks dataset.
2. [ ] Determine a suitable scaling factor or mapping function to convert the play count to bubble sizes.
3. [ ] Apply the scaling factor or mapping function to dynamically set the sizes of the bubbles in the bubble chart.

## Feature 5: Interactive Track Details

- [ ] **Description**: Implement interactivity to allow users to view additional details about each track by hovering over the bubbles.

**Steps**:

1. [ ] Add event listeners to the bubbles in the chart to detect hover events.
2. [ ] Retrieve the relevant track details for the hovered bubble from the recently played tracks dataset.
3. [ ] Display the track details (e.g., track name, artist, album) in a tooltip or a separate section of the web app's user interface.
4. [ ] Customize the tooltip or track details display to provide an informative and visually appealing experience for users.
