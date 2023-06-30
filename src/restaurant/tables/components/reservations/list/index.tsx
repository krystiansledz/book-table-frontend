import React, { useMemo } from "react";
import { useRestaurantTable } from "../../../rquery.ts";
import { useRestaurantBusinessHours } from "../../../../businessHours/rquery.ts";
import { Card, Heading, HStack, Spinner, Stack, Text } from "@chakra-ui/react";
import { DateTime } from "luxon";
import {
  filterReservationsByDate,
  getFreeSlots,
} from "../../../../../reservation/utils.ts";

type Props = {
  restaurantId: string | number;
  restaurantTableId: string | number;
  date: Date;
};

const RestaurantTableReservationsList: React.FC<Props> = ({
  restaurantId,
  restaurantTableId,
  date,
}) => {
  const { data: businessHours, isLoading: businessHoursIsLoading } =
    useRestaurantBusinessHours(restaurantId);
  const { data: restaurantTable, isLoading: restaurantTableIsLoading } =
    useRestaurantTable(restaurantId, restaurantTableId);

  const filteredReservations = useMemo(
    () =>
      restaurantTable
        ? filterReservationsByDate(restaurantTable.reservations, date)
        : null,
    [restaurantTable, date]
  );

  const freeSlots = useMemo(
    () =>
      filteredReservations && businessHours
        ? getFreeSlots(filteredReservations, businessHours, date)
        : null,
    [filteredReservations, businessHours, date]
  );

  if (businessHoursIsLoading || restaurantTableIsLoading)
    return <Spinner size="xl" mx="auto" />;

  return (
    <Card bg="gray.600" p={4}>
      <HStack alignItems="flex-start">
        <Stack w="50%" alignItems="flex-start">
          <Heading>Reservations</Heading>
          {!filteredReservations ||
            (filteredReservations.length === 0 && <Text>No reservations</Text>)}
          {filteredReservations?.map((reservation) => (
            <Card p={2} key={reservation.id}>
              {DateTime.fromISO(reservation.startDateTime).toFormat("HH:mm")} -{" "}
              {DateTime.fromISO(reservation.endDateTime).toFormat("HH:mm")}
            </Card>
          ))}
        </Stack>
        <Stack w="50%" alignItems="flex-start">
          <Heading>Free Slots</Heading>
          {!freeSlots || (freeSlots.length === 0 && <Text>No free slots</Text>)}
          {freeSlots?.map((reservation, index) => (
            <Card p={2} key={index}>
              {DateTime.fromISO(reservation.startDateTime).toFormat("HH:mm")} -{" "}
              {DateTime.fromISO(reservation.endDateTime).toFormat("HH:mm")}
            </Card>
          ))}
        </Stack>
      </HStack>
    </Card>
  );
};

export default RestaurantTableReservationsList;
