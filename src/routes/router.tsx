import { createBrowserRouter } from "react-router-dom";
import AppRoute from "./root.tsx";
import ErrorPage from "pages/error";
import SignInPage from "pages/auth/signIn.tsx";
import SignUpPage from "pages/auth/signUp";
import RestaurantsPage from "../pages/restaurants";
import RestaurantDetailsPage from "../pages/restaurants/details";
import ROUTES from "./index.tsx";
import BusinessPage from "../pages/business";
import RestaurantMyPage from "../pages/restaurants/my";
import ReservationsMyPage from "../pages/reservations/my";
import ProtectedRoute from "./protected.tsx";

const router = createBrowserRouter([
  {
    path: ROUTES.Base(),
    element: <AppRoute />,
    children: [
      {
        path: ROUTES.Business(),
        element: <BusinessPage />,
      },
      {
        path: ROUTES.SignIn(),
        element: <SignInPage />,
      },
      {
        path: ROUTES.SignUp(),
        element: <SignUpPage />,
      },
      {
        path: ROUTES.Restaurants(),
        element: <RestaurantsPage />,
      },
      {
        path: ROUTES.RestaurantMy(),
        element: (
          <ProtectedRoute userType="RESTAURANT">
            <RestaurantMyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.RestaurantDetails(),
        element: <RestaurantDetailsPage />,
      },
      {
        path: ROUTES.Reservations(),
        element: (
          <ProtectedRoute userType="CUSTOMER">
            <ReservationsMyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
