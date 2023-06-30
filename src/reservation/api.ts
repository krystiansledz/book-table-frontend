import axios from "axios";
import { ReservationFormValues } from "./types.ts";

export const postReservation = (
  restaurantId: string | number,
  data: ReservationFormValues
) =>
  axios
    .post(`restaurants/${restaurantId}/reservations`, data)
    .then((response) => response.data);

export const deleteReservation = (reservationId: string | number) =>
  axios
    .delete(`/reservations/${reservationId}`)
    .then((response) => response.data);

export const putReservationRating = (
  reservationId: string | number,
  rating: number
) =>
  axios
    .put(`/reservations/${reservationId}/rating`, { rating })
    .then((response) => response.data);
