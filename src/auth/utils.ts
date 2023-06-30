import axios from "axios";
import { PostSignInResponse } from "./types.ts";

export const setAxiosDefaultBaseUrl = () => {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
};

export const setAxiosAuthorizationHeader = (AUTH_TOKEN: string) => {
  axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
};

export const removeAxiosAuthorizationHeader = () => {
  delete axios.defaults.headers.common["Authorization"];
};

export const getAuthTokenFromSignInResponse = (response: PostSignInResponse) =>
  `${response.tokenType} ${response.accessToken}`;
