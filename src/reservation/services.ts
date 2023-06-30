import {
  deleteReservation,
  postReservation,
  putReservationRating,
} from "./api.ts";
import { invalidateUseMyReservations } from "./rquery.ts";
import { ReservationFormValues } from "./types.ts";
import { invalidateUseRestaurantTables } from "../restaurant/tables/rquery.ts";

export const postReservationService = async (
  restaurantId: string | number,
  data: ReservationFormValues
) => {
  await postReservation(restaurantId, data);
  await invalidateUseMyReservations();
  await invalidateUseRestaurantTables(restaurantId);
};

export const deleteReservationService = async (
  reservationId: string | number
) => {
  await deleteReservation(reservationId);
  await invalidateUseMyReservations();
};

export const putReservationRatingService = async (
  reservationId: string | number,
  rating: number
) => {
  await putReservationRating(reservationId, rating);
  await invalidateUseMyReservations();
};
