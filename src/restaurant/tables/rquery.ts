import { useQuery } from "react-query";
import { RestaurantTable } from "./schemas.ts";
import axios from "axios";
import { queryClient } from "../../rquery/provider.tsx";
import { DateTime } from "luxon";

export const useRestaurantTables = (restaurantId: string | number) =>
  useQuery<RestaurantTable[]>(`restaurant-${restaurantId}-tables`, () =>
    axios
      .get(`/restaurants/${restaurantId}/tables`)
      .then((response) => response.data)
  );

export const invalidateUseRestaurantTables = (restaurantId: string | number) =>
  queryClient.invalidateQueries(`restaurant-${restaurantId}-tables`);

export const useRestaurantTable = (
  restaurantId: string | number,
  restaurantTableId: string | number
) =>
  useQuery<RestaurantTable>(
    `restaurant-${restaurantId}-tables-${restaurantTableId}`,
    () =>
      axios
        .get(`/restaurants/${restaurantId}/tables/${restaurantTableId}`)
        .then((response) => response.data)
  );

export const invalidateUseRestaurantTable = (
  restaurantId: string | number,
  restaurantTableId: string | number
) =>
  queryClient.invalidateQueries(
    `restaurant-${restaurantId}-tables-${restaurantTableId}`
  );

export const useAvailableRestaurantTables = (
  restaurantId: string | number,
  date: Date,
  startTime?: string,
  endTime?: string
) => {
  const dateString = DateTime.fromJSDate(date).toFormat("yyyy-MM-dd");
  const searchParams = new URLSearchParams({
    start: dateString + "T" + startTime,
    end: dateString + "T" + endTime,
  });

  return useQuery<RestaurantTable[]>(
    [
      `restaurant-${restaurantId}-tables`,
      `restaurant-${restaurantId}-tables-${searchParams}`,
    ],
    () =>
      axios
        .get(`/restaurants/${restaurantId}/available-tables?${searchParams}`)
        .then((response) => response.data),
    {
      enabled: !(!date || !startTime || !endTime),
    }
  );
};
