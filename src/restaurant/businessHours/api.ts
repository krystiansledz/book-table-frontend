import { RestaurantBusinessHourFormValues } from "./schemas.ts";
import axios from "axios";

export const postRestaurantBusinessHour = (
  restaurantId: string | number,
  data: RestaurantBusinessHourFormValues
) =>
  axios
    .post(`/restaurants/${restaurantId}/businessHours`, data)
    .then((response) => response.data);

export const putRestaurantBusinessHour = (
  restaurantBusinessHourId: string | number,
  data: RestaurantBusinessHourFormValues
) =>
  axios
    .put(`/businessHours/${restaurantBusinessHourId}`, data)
    .then((response) => response.data);

export const deleteRestaurantBusinessHour = (
  restaurantBusinessHourId: string | number
) =>
  axios
    .delete(`/businessHours/${restaurantBusinessHourId}`)
    .then((response) => response.data);
