import React, { PropsWithChildren } from "react";
import ThemeProvider from "./theme/provider.tsx";
import AuthProvider from "./auth/provider.tsx";
import UserProvider from "./user/provider.tsx";
import RQueryProvider from "./rquery/provider.tsx";

type Props = PropsWithChildren;

const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <RQueryProvider>
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>{children}</UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </RQueryProvider>
  );
};

export default AppProviders;
