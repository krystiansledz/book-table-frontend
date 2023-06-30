import { RestaurantBusinessHourFormValues } from "./schemas.ts";
import {
  deleteRestaurantBusinessHour,
  postRestaurantBusinessHour,
  putRestaurantBusinessHour,
} from "./api.ts";
import { invalidateUseRestaurantBusinessHours } from "./rquery.ts";

export const postRestaurantBusinessHourService = async (
  restaurantId: string | number,
  data: RestaurantBusinessHourFormValues
) => {
  await postRestaurantBusinessHour(restaurantId, data);
  await invalidateUseRestaurantBusinessHours(restaurantId);
};

export const putRestaurantBusinessHourService = async (
  restaurantId: string | number,
  restaurantBusinessHourId: string | number,
  data: RestaurantBusinessHourFormValues
) => {
  await putRestaurantBusinessHour(restaurantBusinessHourId, data);
  await invalidateUseRestaurantBusinessHours(restaurantId);
};

export const deleteRestaurantBusinessHourService = async (
  restaurantId: string | number,
  restaurantBusinessHourId: string | number
) => {
  await deleteRestaurantBusinessHour(restaurantBusinessHourId);
  await invalidateUseRestaurantBusinessHours(restaurantId);
};
