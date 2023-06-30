import React, { PropsWithChildren, useEffect } from "react";
import { createContext } from "utils/react.ts";
import { postSignIn } from "auth/api.ts";
import {
  setAxiosAuthorizationHeader,
  removeAxiosAuthorizationHeader,
  getAuthTokenFromSignInResponse,
} from "auth/utils.ts";

import { useLocalStorage } from "usehooks-ts";
import { SignInFormValues } from "./schema.ts";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes";

type AuthContext = {
  signIn: (data: SignInFormValues) => Promise<void>;
  signOut: () => void;
};

const [useAuthContext, Provider] = createContext<AuthContext>("Auth");

export { useAuthContext };

type Props = PropsWithChildren;

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authToken, setAuthToken] = useLocalStorage<string | null>(
    "authToken",
    null
  );
  const navigate = useNavigate();

  if (authToken) setAxiosAuthorizationHeader(authToken);

  useEffect(() => {
    if (!authToken) removeAxiosAuthorizationHeader();
  }, [authToken]);

  const signIn = (data: SignInFormValues) => {
    return postSignIn(data).then((response) => {
      const token = getAuthTokenFromSignInResponse(response);
      setAuthToken(token);
      setAxiosAuthorizationHeader(token);
    });
  };

  const signOut = () => {
    setAuthToken(null);
    removeAxiosAuthorizationHeader();
    navigate(ROUTES.Base());
  };

  return <Provider value={{ signOut, signIn }}>{children}</Provider>;
};

export default AuthProvider;
