import { requestRefreshToken, SPOTIFY_API_ENDPOINT } from "$lib/server/Spotify";
import { error, redirect } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  // if (event.url.pathname.startsWith("/custom")) {
  //   return new Response("custom response");
  // }

  // Do we have user accessToken or refreshToken?
  const accessToken = event.cookies.get("access_token");
  const refreshToken = event.cookies.get("refresh_token");

  if (
    // if no tokens
    !accessToken &&
    !refreshToken &&
    // and not logging in
    !event.url.pathname.startsWith("/confirmed") &&
    // and not on home page
    event.url.pathname !== "/"
  ) {
    // send back to homepage
    throw redirect(307, "/?redirect=true");
  }

  if (!!accessToken && !!refreshToken) {
    const userProfileResponse = await event.fetch(`${SPOTIFY_API_ENDPOINT}/me`);
    const userProfile: SpotifyApi.CurrentUsersProfileResponse =
      await userProfileResponse
        .json();

    event.locals.user = userProfile;
  } else event.locals.user = null;

  const response = await resolve(event);
  return response;
}

/** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({ request, fetch, event }) {
  if (!request.url.startsWith(SPOTIFY_API_ENDPOINT)) return fetch(request);

  // do some fancy stuff with spotify api
  if (request.url.startsWith(SPOTIFY_API_ENDPOINT)) {
    const accessToken = event.cookies.get("access_token");
    if (!accessToken) throw new Error("Couldn't find a valid access token!");
    request.headers.append("Authorization", "Bearer " + accessToken);
    const response = await fetch(request);
    if (response.status == 200) return response;

    // reauthorize
    if (response.status == 401) {
      const refresh_token = event.cookies.get("refresh_token");
      if (!refresh_token) throw error(500, "Can't find refresh token");

      const refreshTokenResponse = await requestRefreshToken(refresh_token);
      if (refreshTokenResponse !== null) {
        event.cookies.set("access_token", refreshTokenResponse?.access_token);
      }
      // 2nd time's the charm...
      return await fetch(request.url, {
        headers: {
          "Authorization": "Bearer " + refreshTokenResponse?.access_token,
          "Content-Type": "application/json",
        },
      });
    }
    // rate limited...
    if (response.status == 429) throw new Error("Too Many Requests!");
    if (response.status != 200) throw new Error("ERROR! Probably Auth issue");
    return response;
  }

  return fetch(request);
}
