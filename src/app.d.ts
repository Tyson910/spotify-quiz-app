/// <reference types="unplugin-icons/types/svelte" />
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Error {}
  interface Locals {
    user: SpotifyApi.CurrentUsersProfileResponse | null;
  }
  // interface PageData {}
  // interface Platform {}
}

