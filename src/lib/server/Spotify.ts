import { CLIENT_ID, CLIENT_SECRET } from "$env/static/private";

async function getAccessToken(): Promise<string | null> {
  const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
  const fetchOptions = {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      "Authorization": "Basic " +
        (Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  interface ApiTokenResponse {
    access_token?: string;
    token_type?: "bearer";
    expires_in?: number;
  }
  try {
    const response = await fetch(TOKEN_ENDPOINT, fetchOptions);

    if (response.status != 200) throw new Error("Unable to fetch data");
    const { access_token }: ApiTokenResponse = await response.json();
    return access_token || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function fetchFromSpotify<Type>(query: string): Promise<Type> {
  if (!query.startsWith("/")) {
    throw new Error(
      "Invalid query! Please make sure query string begins with a '/' ",
    );
  }

  const SPOTIFY_API_ENDPOINT = "https://api.spotify.com/v1";
  const accessToken = await getAccessToken();

  if (!accessToken) throw new Error("Couldn't generate valid access token!");

  const response = await fetch(SPOTIFY_API_ENDPOINT + query, {
    headers: {
      "Authorization": "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });

  if (response.status != 200) throw new Error("ERROR! Probably Auth issue");

  return response.json();
}

async function findArtist(
  artistQuery: string,
): Promise<SpotifyApi.ArtistObjectFull[]> {
  try {
    // %20tag:hipster add
    const response: SpotifyApi.ArtistSearchResponse & SpotifyApi.TrackSearchResponse = await fetchFromSpotify(
      `/search?type=artist,tracks&limit=5&q=${encodeURIComponent(artistQuery)}`,
    );
    if (!response?.artists?.items || response.artists.items.length < 1) {
      throw new Error("Artist couldnt be found");
    }
    return response.artists.items.sort((a, b) => b.popularity - a.popularity);
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function getArtistTracks(
  artistName: string,
): Promise<SpotifyApi.TrackObjectFull[]> {
  try {
    // %20tag:hipster add
    const response: SpotifyApi.TrackSearchResponse = await fetchFromSpotify(
      `/search?type=tracks&limit=50&q=${encodeURIComponent(artistName)}`,
    );
    if (!response?.tracks?.items || response.tracks.items.length < 1) {
      throw new Error("Artist couldnt be found");
    }
    response.tracks.items = removeDuplicateTracks(response.tracks.items);
    // fetching 50 tracks and removing duplicates, game should be good with at least 20-25 songs,
    // v suprising if an artist doesn't have at least 20 songs
    if (response.tracks.items.length < 20) {
      throw new Error("Not enough songs found to play a game");
    }
    return response.tracks.items;
    // return response.tracks.items.sort((a, b) => b.popularity - a.popularity);
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function getTopTracksFromArtist(
  artistID: SpotifyApi.ArtistObjectFull["id"],
): Promise<SpotifyApi.ArtistsTopTracksResponse["tracks"]> {
  try {
    // %20tag:hipster add
    const { tracks }: SpotifyApi.ArtistsTopTracksResponse =
      await fetchFromSpotify(
        `/artists/${artistID}/top-tracks?market=US`,
      );
    if (!tracks || tracks?.length < 1) {
      throw new Error("Artist top tracks couldnt be found");
    }
    // TODO: filter out any tracks that dont include a preview id
    return tracks;
  } catch (err) {
    console.log(err);
    return [];
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

export {
  fetchFromSpotify,
  findArtist,
  getTopTracksFromArtist,
};
