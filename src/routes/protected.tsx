import React, { PropsWithChildren, useEffect } from "react";
import { UserType } from "../user/types.ts";
import {
  useIsUserAuthenticated,
  useIsUserCustomer,
  useIsUserRestaurant,
} from "../user/hooks.ts";
import { useNavigate } from "react-router-dom";
import ROUTES from "./index.tsx";
import Loader from "../components/ui/loader.tsx";

type Props = PropsWithChildren & {
  userType?: UserType;
};

const ProtectedRoute: React.FC<Props> = ({ children, userType }) => {
  const isAuthenticated = useIsUserAuthenticated();
  const isRestaurant = useIsUserRestaurant();
  const isCustomer = useIsUserCustomer();
  const navigate = useNavigate();

  const isUserTypeAllowed =
    !userType ||
    (userType === "RESTAURANT" && isRestaurant) ||
    (userType === "CUSTOMER" && isCustomer);

  const isAuthorized = !!isAuthenticated && isUserTypeAllowed;

  useEffect(() => {
    if (isAuthenticated !== undefined && !isAuthorized) {
      navigate(ROUTES.Base(), { replace: true });
    }
  }, [isAuthenticated, isAuthorized]);

  if (isAuthenticated === undefined) return <Loader />;

  return children;
};

export default ProtectedRoute;
