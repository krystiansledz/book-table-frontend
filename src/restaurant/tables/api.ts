import { RestaurantTableFormValues } from "./schemas.ts";
import axios from "axios";

export const postRestaurantTable = (
  restaurantId: string | number,
  data: RestaurantTableFormValues
) =>
  axios
    .post(`/restaurants/${restaurantId}/tables`, data)
    .then((response) => response.data);

export const putRestaurantTable = (
  restaurantId: string | number,
  restaurantTableId: string | number,
  data: RestaurantTableFormValues
) =>
  axios
    .put(`/restaurants/${restaurantId}/tables/${restaurantTableId}`, data)
    .then((response) => response.data);

export const deleteRestaurantTable = (
  restaurantId: string | number,
  restaurantTableId: string | number
) =>
  axios
    .delete(`/restaurants/${restaurantId}/tables/${restaurantTableId}`)
    .then((response) => response.data);
