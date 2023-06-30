import { z } from "zod";
import { daysOfWeek } from "./const.ts";

export const RestaurantBusinessHourSchema = z.object({
  id: z.number(),
  dayOfWeek: z.enum(daysOfWeek),
  openingTime: z
    .string()
    .regex(new RegExp("^([01]\\d|2[0-3]):([0-5]\\d):([0-5]\\d)$")),
  closingTime: z
    .string()
    .regex(new RegExp("^([01]\\d|2[0-3]):([0-5]\\d):([0-5]\\d)$")),
  restaurant_id: z.number(),
});

export type RestaurantBusinessHour = z.infer<
  typeof RestaurantBusinessHourSchema
>;

export const RestaurantBusinessHourFormSchema =
  RestaurantBusinessHourSchema.pick({
    dayOfWeek: true,
    openingTime: true,
    closingTime: true,
  });

export type RestaurantBusinessHourFormValues = z.infer<
  typeof RestaurantBusinessHourFormSchema
>;

export const getRestaurantBusinessHourFormDefaultValues = (
  restaurantBusinessHour?: RestaurantBusinessHour
) =>
  ({
    dayOfWeek: restaurantBusinessHour?.dayOfWeek,
    openingTime: restaurantBusinessHour?.openingTime,
    closingTime: restaurantBusinessHour?.closingTime,
  } satisfies Partial<RestaurantBusinessHourFormValues>);
