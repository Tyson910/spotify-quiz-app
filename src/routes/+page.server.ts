import { findArtist } from "$lib/server/Spotify";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const userSearchInput = data.get("artist-search");
    if (
      !userSearchInput ||
      typeof userSearchInput != "string" &&
        typeof userSearchInput != "number"
    ) {
      return fail(400, { userSearchInput, missing: true });
    }

    try {
      // TODO: find a way to cache recent/popular responses
      const artists = await findArtist(userSearchInput.toString());
      return { missing: false, artists };
    } catch (error) {
      console.log(error);
    }
  },
};
