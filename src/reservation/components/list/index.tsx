import React from "react";
import { Card, Spinner, Stack, Text } from "@chakra-ui/react";
import PageTitle from "../../../components/ui/page/title.tsx";
import { useMyReservations } from "../../rquery.ts";
import MyReservationItem from "./item.tsx";

const MyReservationsList: React.FC = () => {
  const { data, isLoading } = useMyReservations();

  if (isLoading) return <Spinner size="xl" mx="auto" />;

  if (!data) return <Text>Error</Text>;

  return (
    <Card p={4} textAlign="left">
      <Stack>
        <Stack direction="row" justifyContent="space-between">
          <PageTitle title="My Reservations" />
        </Stack>
        <Stack>
          {data.length === 0 && <Text>No reservations</Text>}
          {data.map((reservation) => (
            <MyReservationItem key={reservation.id} reservation={reservation} />
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};

export default MyReservationsList;
