import React from "react";
import AppLayout from "../layout";
import { Outlet, useLocation } from "react-router-dom";
import ROUTES from "./index.tsx";
import BasePage from "pages/base";
import AppProviders from "../providers.tsx";

const AppRoute: React.FC = () => {
  const { pathname } = useLocation();

  const isBase = pathname === ROUTES.Base();

  return (
    <AppProviders>
      <AppLayout>
        {isBase && <BasePage />}
        {!isBase && <Outlet />}
      </AppLayout>
    </AppProviders>
  );
};

export default AppRoute;
