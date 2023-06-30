import { z } from "zod";
import { Restaurant } from "../restaurant/schemas.ts";
import { RestaurantTable } from "../restaurant/tables/schemas.ts";

export const ReservationSchema = z.object({
  id: z.number(),
  startDateTime: z.string().datetime(),
  endDateTime: z.string().datetime(),
  restaurantTable_id: z.number(),
});

export type Reservation = z.infer<typeof ReservationSchema>;

export type MyReservation = Omit<Reservation, "restaurantTable_id"> & {
  restaurant: Pick<Restaurant, "id" | "name" | "address">;
  restaurantTable: Pick<RestaurantTable, "capacity" | "number">;
  rating?: number;
};
