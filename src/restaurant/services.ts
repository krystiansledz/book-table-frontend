import { RestaurantFormValues } from "./schemas.ts";
import { putRestaurant } from "./api.ts";
import {
  invalidateUseRestaurantQuery,
  invalidateUseRestaurantsQuery,
} from "./rquery.ts";

export const putRestaurantService = async (
  id: number,
  data: RestaurantFormValues
) => {
  await putRestaurant(id, data);
  await invalidateUseRestaurantsQuery();
  await invalidateUseRestaurantQuery(id);
};
