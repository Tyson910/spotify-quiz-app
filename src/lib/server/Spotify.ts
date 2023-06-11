import { CLIENT_ID, CLIENT_SECRET } from "$env/static/private";
const SPOTIFY_API_ENDPOINT = "https://api.spotify.com/v1";

interface SpotifyAccessToken {
  /** An Access Token that can be provided in subsequent calls, for example to Spotify Web API services. */
  access_token: string;
  /** How the Access Token may be used: always "Bearer". */
  token_type: string;
  /** A space-separated list of scopes which have been granted for this access_token. */
  scope: string;
  /** The time period (in seconds) for which the Access Token is valid. */
  expires_in: number;
  /**
   * A token that can be sent to the Spotify Accounts service in place of an authorization code.
   * (When the access code expires, send a POST request to the Accounts service /api/token endpoint,
   * but use this code in place of an authorization code. A new Access Token will be returned.
   * A new refresh token might be returned too.)
   */
  refresh_token: string;
}

async function requestAccessToken(authCode: string) {
  const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      body: new URLSearchParams({
        code: authCode,
        redirect_uri: "http://localhost:5173/confirmed",
        grant_type: "authorization_code",
      }),
      headers: {
        "Authorization": "Basic " +
          (Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64")),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (response.status != 200) throw new Error("Unable to fetch data");
    const spotifyAccessToken: SpotifyAccessToken = await response.json();
    return spotifyAccessToken;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function requestRefreshToken(refresh_token: string) {
  const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token
      }),
      headers: {
        "Authorization": "Basic " +
          (Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64")),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (response.status != 200) throw new Error("Unable to fetch data");
    const spotifyAccessToken: SpotifyAccessToken = await response.json();
    return spotifyAccessToken;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function removeDuplicateTracks(
  tracks: SpotifyApi.TrackObjectFull[],
): SpotifyApi.TrackObjectFull[] {
  const trackNames = tracks.map(({ name }) => name);
  const removeDupeTracks = tracks.filter(({ name }, i) =>
    !trackNames.includes(name, i + 1)
  );
  return removeDupeTracks;
}

export { requestAccessToken, requestRefreshToken, SPOTIFY_API_ENDPOINT };
