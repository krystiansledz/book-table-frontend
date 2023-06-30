import { useQuery } from "react-query";
import axios from "axios";
import { Restaurant } from "./schemas.ts";
import { queryClient } from "../rquery/provider.tsx";
import { RestaurantRatings } from "./types.ts";

export const useRestaurants = (searchParams?: string) =>
  useQuery<Restaurant[]>(`restaurants-${searchParams}`, () =>
    axios
      .get(`/restaurants${searchParams ? `?${searchParams}` : ""}`)
      .then((response) => response.data)
  );

export const invalidateUseRestaurantsQuery = () =>
  queryClient.invalidateQueries(`restaurants`);

export const useRestaurant = (id: string) =>
  useQuery<Restaurant>(`restaurant-${id}`, () =>
    axios.get(`/restaurants/${id}`).then((response) => response.data)
  );

export const invalidateUseRestaurantQuery = (id: number) =>
  queryClient.invalidateQueries(`restaurant-${id}`);

export const useRestaurantRatings = (id: string | number) =>
  useQuery<RestaurantRatings>(`restaurant-${id}-ratings`, () =>
    axios.get(`/restaurants/${id}/ratings`).then((response) => response.data)
  );
