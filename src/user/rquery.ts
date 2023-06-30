import axios from "axios";
import { User } from "./types.ts";
import { useQuery } from "react-query";

export const useMe = (authToken: string | null) =>
  useQuery<User>(
    "user-me",
    () => axios.get("/user/me").then((response) => response.data),
    { enabled: !!authToken }
  );
