import { Reservation } from "./schemas.ts";
import { BusinessHour } from "../businessHours/schemas.ts";
import { daysOfWeek } from "../restaurant/businessHours/const.ts";

export const filterReservationsByDate = (
  reservations: Reservation[],
  date: Date
) =>
  reservations.filter((reservation) => {
    const reservationDate = new Date(reservation.startDateTime);
    return (
      reservationDate.getUTCFullYear() === date.getUTCFullYear() &&
      reservationDate.getUTCMonth() === date.getUTCMonth() &&
      reservationDate.getUTCDate() === date.getUTCDate()
    );
  });

type Slot = {
  startDateTime: string;
  endDateTime: string;
};

export const getFreeSlots = (
  reservations: Reservation[],
  openingHours: BusinessHour[],
  date: Date
): Slot[] => {
  const freeSlots: Slot[] = [];

  const inputDayOfWeek = daysOfWeek[(date.getUTCDay() + 6) % 7];

  const hours = openingHours.find((hour) => hour.dayOfWeek === inputDayOfWeek);

  if (!hours) {
    return freeSlots;
  }

  let openTime = hours.openingTime;
  const closeTime = hours.closingTime;

  if (reservations.length === 0) {
    freeSlots.push({ startDateTime: openTime, endDateTime: closeTime });
    return freeSlots;
  }

  reservations.forEach((reservation, index) => {
    const reservationStart = reservation.startDateTime.split("T")[1];
    const reservationEnd = reservation.endDateTime.split("T")[1];

    if (openTime < reservationStart) {
      freeSlots.push({
        startDateTime: openTime,
        endDateTime: reservationStart,
      });
    }

    openTime = reservationEnd;
    if (index === reservations.length - 1 && openTime < closeTime) {
      freeSlots.push({ startDateTime: openTime, endDateTime: closeTime });
    }
  });

  return freeSlots;
};
