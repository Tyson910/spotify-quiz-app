import { SPOTIFY_API_ENDPOINT } from "$lib/server/Spotify.js";
import { redirect } from "@sveltejs/kit";

export async function load({ cookies, route, fetch }) {
  // Do we have user accessToken or refreshToken?
  const accessToken = cookies.get("access_token");
  const refreshToken = cookies.get("refresh_token");

  if (!accessToken && !refreshToken && route.id !== "/") {
    throw redirect(307, "/");
  }

  // if on homepage but no tokens yet then don't try to fetch userProfile data
  if (!accessToken) return { userProfile: null };

  const response = await fetch(`${SPOTIFY_API_ENDPOINT}/me`);
  const userProfile: SpotifyApi.CurrentUsersProfileResponse = await response
    .json();
  return { userProfile };
}
