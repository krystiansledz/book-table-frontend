import React, { PropsWithChildren, useEffect, useState } from "react";
import { createContext } from "utils/react.ts";

import { useReadLocalStorage } from "usehooks-ts";
import { User } from "./types.ts";
import { useMe } from "./rquery.ts";
import { useAuthContext } from "../auth/provider.tsx";
import Loader from "../components/ui/loader.tsx";

type UserContext = {
  user?: User | null;
};

const [useUserContext, Provider] = createContext<UserContext>("User");

export { useUserContext };

type Props = PropsWithChildren;

const UserProvider: React.FC<Props> = ({ children }) => {
  const authToken = useReadLocalStorage<string | null>("authToken");
  const [user, setUser] = useState<User | null>();
  const { signOut } = useAuthContext();

  const query = useMe(authToken);

  useEffect(() => {
    if (!authToken) {
      setUser(null);
      return;
    }

    if (query.isError) {
      setUser(null);
      signOut();
    }

    if (!query.isLoading && query.data) {
      setUser(query.data);
    }
  }, [authToken, query]);

  return (
    <Provider value={{ user }}>
      {query.isLoading ? <Loader /> : children}
    </Provider>
  );
};

export default UserProvider;
