import { useQuery } from "react-query";
import { RestaurantBusinessHour } from "./schemas.ts";
import axios from "axios";
import { queryClient } from "../../rquery/provider.tsx";

export const useRestaurantBusinessHours = (restaurantId: string | number) =>
  useQuery<RestaurantBusinessHour[]>(
    `restaurant-${restaurantId}-businessHours`,
    () =>
      axios
        .get(`/restaurants/${restaurantId}/businessHours`)
        .then((response) => response.data)
  );

export const invalidateUseRestaurantBusinessHours = (
  restaurantId: string | number
) => queryClient.invalidateQueries(`restaurant-${restaurantId}-businessHours`);
