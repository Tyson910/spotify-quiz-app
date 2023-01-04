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

