import { RestaurantTableFormValues } from "./schemas.ts";
import {
  deleteRestaurantTable,
  postRestaurantTable,
  putRestaurantTable,
} from "./api.ts";
import { invalidateUseRestaurantTables } from "./rquery.ts";

export const postRestaurantTableService = async (
  restaurantId: string | number,
  data: RestaurantTableFormValues
) => {
  await postRestaurantTable(restaurantId, data);
  await invalidateUseRestaurantTables(restaurantId);
};

export const putRestaurantTableService = async (
  restaurantId: string | number,
  restaurantTableId: string | number,
  data: RestaurantTableFormValues
) => {
  await putRestaurantTable(restaurantId, restaurantTableId, data);
  await invalidateUseRestaurantTables(restaurantId);
};

export const deleteRestaurantTableService = async (
  restaurantId: string | number,
  restaurantTableId: string | number
) => {
  await deleteRestaurantTable(restaurantId, restaurantTableId);
  await invalidateUseRestaurantTables(restaurantId);
};
