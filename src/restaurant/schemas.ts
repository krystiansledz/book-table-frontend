import { z } from "zod";
import { BusinessHourSchema } from "../businessHours/schemas.ts";
import { requiredString } from "../utils/zod.ts";
import { RestaurantTableSchema } from "./tables/schemas.ts";

export const RestaurantSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  address: z.string(),
  rating: z.number().optional(),
  businessHours: z.array(BusinessHourSchema),
  restaurantTables: z.array(RestaurantTableSchema),
});

export type Restaurant = z.infer<typeof RestaurantSchema>;

export const RestaurantFormSchema = z.object({
  name: requiredString,
  address: z.string(),
});

export type RestaurantFormValues = z.infer<typeof RestaurantFormSchema>;

export const getRestaurantFormDefaultValues = (restaurant?: Restaurant) =>
  ({
    name: restaurant?.name ?? "",
    address: restaurant?.address ?? "",
  } satisfies RestaurantFormValues);
