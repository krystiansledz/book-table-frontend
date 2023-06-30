import { RestaurantFormValues } from "./schemas.ts";
import axios from "axios";

export const putRestaurant = (id: number, data: RestaurantFormValues) =>
  axios.put(`/restaurants/${id}`, data);
