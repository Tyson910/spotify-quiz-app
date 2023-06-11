import { requestRefreshToken, SPOTIFY_API_ENDPOINT } from "$lib/server/Spotify";
import { error } from "@sveltejs/kit";
export async function handleFetch({ request, fetch, event }) {
  if (!request.url.startsWith(SPOTIFY_API_ENDPOINT)) return fetch(request);
  
  // do some fancy stuff with spotify api
  if (request.url.startsWith(SPOTIFY_API_ENDPOINT)) {
    const accessToken = event.cookies.get("access_token");
    if (!accessToken) throw new Error("Couldn't find a valid access token!");

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
