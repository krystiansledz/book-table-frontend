import React from "react";
import router from "./router.tsx";
import { RouterProvider } from "react-router-dom";

const AppRouterProvider: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouterProvider;
