import { redirect } from "@sveltejs/kit";
import { CLIENT_ID } from "$env/static/private";

export const actions = {
  "log-in": async (event) => {
    const state = crypto.randomUUID();
    event.cookies.set('state', state, { path: "/" });
    const scope = "user-read-recently-played";

    const spotifyCredOptions = {
      response_type: "code",
      client_id: CLIENT_ID,
      show_dialog: 'true',
      scope,
      redirect_uri: "http://localhost:5173/confirmed",
      state,
    };
    const queryParams = new URLSearchParams(spotifyCredOptions).toString();
    throw redirect(
      307,
      "https://accounts.spotify.com/authorize?" +
        queryParams,
    );
  },
  logout: async (event) => {
    event.cookies.delete('state');
    event.cookies.delete('access_token');
  },
};
