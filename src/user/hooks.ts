import { useUserContext } from "./provider.tsx";

export const useIsUserAuthenticated = () => useUserContext().user;

export const useIsUserRestaurant = () =>
  useUserContext().user?.userType === "RESTAURANT";

export const useIsUserCustomer = () =>
  useUserContext().user?.userType === "CUSTOMER";
