import { requestAccessToken } from "$lib/server/Spotify.js";
import { error, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET({ cookies, url }) {
  const auth_code = url.searchParams.get("code");
  const auth_code_error = url.searchParams.get("error");

  if (auth_code_error !== null) {
    throw error(401, auth_code_error + " unable to access user profile data");
  }

  if (url.searchParams.get("state") !== cookies.get("state")) {
    throw error(400, "Mismatched state");
  }

  if (!auth_code) throw error(400, "invalid auth token");

  cookies.delete("refresh_token", { path: "/" });
  cookies.delete("access_token", { path: "/" });

  const response = await requestAccessToken(auth_code);
  if (response == null) throw error(400, "invalid auth token");

  const { refresh_token, access_token } = response;
  cookies.set("refresh_token", refresh_token);
  cookies.set("access_token", access_token);
  
  throw redirect(303, '/start')
}
