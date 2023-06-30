import axios from "axios";
import {
  SignInFormValues,
  SignUpCustomerFormValues,
  SignUpRestaurantFormValues,
} from "./schema.ts";
import { PostSignInResponse } from "./types.ts";

export const postSignIn = (data: SignInFormValues) =>
  axios
    .post<PostSignInResponse>("/auth/signin", data)
    .then((response) => response.data);

export const postSignUp = (
  data: SignUpCustomerFormValues | SignUpRestaurantFormValues
) => {
  return axios.post("/auth/signup", data).then((response) => response.data);
};
