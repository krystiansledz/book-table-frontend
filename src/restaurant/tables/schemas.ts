import { z } from "zod";
import { ReservationSchema } from "../../reservation/schemas.ts";

export const RestaurantTableSchema = z.object({
  id: z.number(),
  number: z.number(),
  capacity: z.number().int().min(1),
  restaurant_id: z.number(),
  reservations: z.array(ReservationSchema),
});

export type RestaurantTable = z.infer<typeof RestaurantTableSchema>;

export const RestaurantTableFormSchema = RestaurantTableSchema.pick({
  number: true,
  capacity: true,
});

export type RestaurantTableFormValues = z.infer<
  typeof RestaurantTableFormSchema
>;

export const getRestaurantTableFormDefaultValues = (
  restaurantTable?: RestaurantTable
) =>
  ({
    number: restaurantTable?.number ?? NaN,
    capacity: restaurantTable?.capacity ?? NaN,
  } satisfies RestaurantTableFormValues);
