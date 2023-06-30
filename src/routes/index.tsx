import { UserType } from "../user/types.ts";

const ROUTES = {
  Base: () => `/`,
  Business: () => `/business`,
  SignIn: () => `/auth/sign-in`,
  SignUp: (type?: UserType) => `/auth/sign-up${type ? `?type=${type}` : ""}`,
  Restaurants: () => `/restaurants`,
  RestaurantMy: () => `/restaurants/my`,
  RestaurantDetails: (id?: string | number) =>
    `/restaurants/${id ? id : ":id"}`,
  Reservations: () => `/reservations`,
};

export default ROUTES;
