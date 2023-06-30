import React, { useState } from "react";
import RestaurantTableReservationsList from "./list";
import { useRestaurantTables } from "../../rquery.ts";
import { Card, HStack, Select, Spinner, Stack, Text } from "@chakra-ui/react";
import PageTitle from "../../../../components/ui/page/title.tsx";
import DatePicker from "../../../../components/datepicker";

type Props = {
  restaurantId: string | number;
};

const RestaurantTableReservations: React.FC<Props> = ({ restaurantId }) => {
  const { data, isLoading } = useRestaurantTables(restaurantId);
  const [selectedTable, setSelectedTable] = useState<string>();
  const [selectedDate, setSelectedDate] = useState(new Date());

  if (isLoading) return <Spinner size="xl" mx="auto" />;

  if (!data) return <Text>Error</Text>;

  return (
    <Card p={4} textAlign="left">
      <Stack>
        <HStack justifyContent="space-between" alignItems="center">
          <PageTitle title="Table reservations" />

          <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
        </HStack>

        <Select
          placeholder="Restaurant Table"
          value={selectedTable}
          onChange={(event) => setSelectedTable(event.target.value)}
        >
          {data.map((table) => (
            <option key={table.id} value={table.id}>
              No. {table.number} - capacity {table.capacity}
            </option>
          ))}
        </Select>

        {selectedTable && (
          <RestaurantTableReservationsList
            restaurantId={restaurantId}
            restaurantTableId={selectedTable}
            date={selectedDate}
          />
        )}
      </Stack>
    </Card>
  );
};

export default RestaurantTableReservations;
