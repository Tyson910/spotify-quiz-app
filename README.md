# Svelte + TS + Vite

This template should help get you started developing with Svelte and TypeScript in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Need an official Svelte framework?

Check out [SvelteKit](https://github.com/sveltejs/kit#readme), which is also powered by Vite. Deploy anywhere with its serverless-first approach and adapt to various platforms, with out of the box support for TypeScript, SCSS, and Less, and easily-added support for mdsvex, GraphQL, PostCSS, Tailwind CSS, and more.

## Technical considerations

**Why use this over SvelteKit?**

- It brings its own routing solution which might not be preferable for some users.
- It is first and foremost a framework that just happens to use Vite under the hood, not a Vite app.
  `vite dev` and `vite build` wouldn't work in a SvelteKit environment, for example.

This template contains as little as possible to get started with Vite + TypeScript + Svelte, while taking into account the developer experience with regards to HMR and intellisense. It demonstrates capabilities on par with the other `create-vite` templates and is a good starting point for beginners dipping their toes into a Vite + Svelte project.

Should you later need the extended capabilities and extensibility provided by SvelteKit, the template has been structured similarly to SvelteKit so that it is easy to migrate.

**Why `global.d.ts` instead of `compilerOptions.types` inside `jsconfig.json` or `tsconfig.json`?**

Setting `compilerOptions.types` shuts out all other types not explicitly listed in the configuration. Using triple-slash references keeps the default TypeScript setting of accepting type information from the entire workspace, while also adding `svelte` and `vite/client` type information.

**Why include `.vscode/extensions.json`?**

Other templates indirectly recommend extensions via the README, but this file allows VS Code to prompt the user to install the recommended extension upon opening the project.

**Why enable `allowJs` in the TS template?**

While `allowJs: false` would indeed prevent the use of `.js` files in the project, it does not prevent the use of JavaScript syntax in `.svelte` files. In addition, it would force `checkJs: false`, bringing the worst of both worlds: not being able to guarantee the entire codebase is TypeScript, and also having worse typechecking for the existing JavaScript. In addition, there are valid use cases in which a mixed codebase may be relevant.

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/rixo/svelte-hmr#svelte-hmr).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```ts
// store.ts
// An extremely simple external store
import { writable } from 'svelte/store'
export default writable(0)
```

Build a social music trivia game that allows users to compete against each other to identify songs and artists based on short audio clips. The game could use the Spotify API to retrieve songs and audio clips from the Spotify library, and allow users to earn points by correctly identifying the songs and artists. The game could also include features for creating and joining game rooms, challenging friends, and tracking leaderboards.
To build this app, you could use the Spotify API to retrieve data about songs and artists, and use this data to generate trivia questions and audio clips for the game. You could also use a database to store information about users, game rooms, and leaderboards, and implement authentication and authorization features to ensure the security of user data. This app would allow you to showcase your skills in web development, user experience design, and API integration.

1. Plan your app: Start by thinking about the features and functionality you want to include in your trivia game. You may want to create sketches or wireframes to help you visualize the user experience, and write out user stories to help you understand the needs of your users.
2. Set up your development environment: Install the necessary tools and libraries for building your app, such as a text editor, a version control system, and a local server. You will also need to sign up for a Spotify developer account and create a new app to get access to the Spotify API.
3. Integrate with the Spotify API: Use the Spotify API to retrieve data about songs and artists from the Spotify library. You will need to authenticate your app and request permission from users to access their listening history. You can use the API to search for songs and artists, retrieve audio clips and metadata, and create playlists.
4. Build the front-end interface: Use a front-end framework like React or Angular to build the user interface for your trivia game. Design the layout and appearance of your app, and create components for displaying questions, audio clips, and answers.
5. Implement game logic: Use JavaScript or a similar programming language to implement the logic for generating trivia questions, tracking user responses, and calculating scores. You may also want to include features for creating and joining game rooms, challenging friends, and tracking leaderboards.
    1. Generate trivia questions: You will need to create a function or process that generates trivia questions based on data retrieved from the Spotify API. This might involve selecting a random song or artist from the Spotify library, and using the API to retrieve metadata and an audio clip for the question. You could also consider using additional criteria to generate questions, such as specific genres or time periods.
    - [x] Have user select an artist
    - [ ] Get up to 50 tracks for that artist
    - [ ] *Randomly* Select up to 10 tracks for the quiz
    - [ ] For each song
      - [ ] Play short clip (10 - 30 seconds)
      - [ ] Ask user to select from 4 options
      - [ ] Can replay song clip ONCE
    2. Track user responses: You will need to create a way to track the responses of users as they play the game. This might involve storing the responses in a database, or using a front-end state management tool like Redux to keep track of the responses in the user interface.
    3. Calculate scores: You will need to create a function or process that calculates the scores of users based on their responses. This might involve comparing the user's responses to the correct answers and assigning points for correct answers, or using a more complex scoring system based on factors like the difficulty of the questions or the speed of the responses.
    4. Create and join game rooms: If you want to allow users to play the game with friends, you will need to create a way for users to create and join game rooms. This might involve creating a database table to store information about game rooms, and allowing users to search for and join existing rooms or create new ones.
    5. Challenge friends: If you want to allow users to challenge their friends to play the game, you will need to create a way for users to send and accept challenges. This might involve creating a notification system or messaging system to facilitate communication between users.
    6. Track leaderboards: If you want to include a leaderboard in your trivia game, you will need to create a way to track the scores of users over time. This might involve storing the scores in a database and using a ranking algorithm to determine the top scores. You could also consider using additional criteria, such as the number of games played or the win rate, to determine the rankings.

6. Test and debug your app: Test your app thoroughly to ensure that it is functioning correctly. Use a debugging tool to identify and fix any errors or bugs that you encounter.
7. Deploy your app: When your app is ready, you can deploy it to a hosting platform like Heroku or AWS. This will make your app available to users over the internet.
8. Promote and maintain your app: Once your app is live, you can promote it to potential users through social media, online communities, or other channels. You should also plan to update and maintain your app over time, fixing bugs and adding new features as needed.
