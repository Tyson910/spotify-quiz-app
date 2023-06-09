import type { PageServerLoad } from "./$types";
import { beyonceTracks } from "$lib/utils/dummy-data";
import { getArtistTracks, getTopTracksFromArtist } from "$lib/server/Spotify";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = (async ({ params }) => {
  const { artistName, id } = params;
  try {
    // Get up top tracks for that artist
    // const artistTopTracks = await getTopTracksFromArtist(id);
    const artistTopTracks = beyonceTracks;
    // const artistTopTracks = await getArtistTracks(artistName);
    return { artistTopTracks, artistName, id };
  } catch (err) {
    console.log(err);
    throw error(404, "Artist not found");
  }
});
