import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Heading,
  HStack,
  Select,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRestaurantBusinessHours } from "../../../restaurant/businessHours/rquery.ts";
import DatePicker from "../../../components/datepicker";
import { daysOfWeek } from "../../../restaurant/businessHours/const.ts";
import { useAvailableRestaurantTables } from "../../../restaurant/tables/rquery.ts";
import { postReservationService } from "../../services.ts";
import { DateTime } from "luxon";
import useToasts from "../../../components/ui/toast/useToasts.ts";

type Props = {
  restaurantId: string | number;
};

const ReservationForm: React.FC<Props> = ({ restaurantId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();
  const [selectedTable, setSelectedTable] = useState<string | number>();
  const { fireSuccessToast, fireRequestErrorToast } = useToasts();

  const businessHoursQuery = useRestaurantBusinessHours(restaurantId);
  const availableTablesQuery = useAvailableRestaurantTables(
    restaurantId,
    selectedDate,
    startTime,
    endTime
  );

  const timeOptions = useMemo(() => {
    const inputDayOfWeek = daysOfWeek[(selectedDate.getUTCDay() + 6) % 7];

    const hours = businessHoursQuery.data?.find(
      (hour) => hour.dayOfWeek === inputDayOfWeek
    );

    if (!hours) return null;

    return Array.from(
      {
        length:
          (timeToMinutes(hours.closingTime) -
            timeToMinutes(hours.openingTime)) /
            15 +
          1,
      },
      (_, i) => formatTime(timeToMinutes(hours.openingTime) + 15 * i)
    );
  }, [businessHoursQuery, selectedDate]);

  useEffect(() => {
    if (availableTablesQuery.data?.find((table) => table.id === selectedTable))
      setSelectedTable(undefined);
  }, [availableTablesQuery]);

  if (businessHoursQuery.isLoading) return <Spinner size="xl" mx="auto" />;

  const handleSubmit = () => {
    console.log(selectedDate, startTime, endTime, selectedTable);

    if (selectedDate && startTime && endTime && selectedTable) {
      const date = DateTime.fromJSDate(selectedDate).toFormat("yyyy-MM-dd");

      setIsSubmitting(true);
      postReservationService(restaurantId, {
        restaurantTable_id: +selectedTable,
        startDateTime: date + "T" + startTime,
        endDateTime: date + "T" + endTime,
      })
        .then(() => {
          fireSuccessToast("Added");
          setSelectedTable(undefined);
        })
        .catch((error) => {
          fireRequestErrorToast(error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
    <Card p={4} textAlign="left">
      <Stack>
        <Heading>Make Reservation</Heading>
        <HStack>
          <Text w="10rem">Choose Date:</Text>
          <DatePicker
            selectedDate={selectedDate}
            onChange={setSelectedDate}
            min={new Date().toISOString()}
          />
        </HStack>
        {!timeOptions && (
          <Text>Restaurant is not open, choose different date</Text>
        )}
        {timeOptions && (
          <>
            <HStack>
              <Text w="10rem">Start Time:</Text>
              <Select
                placeholder="Start Time"
                w="15rem"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              >
                {timeOptions.map((time) => (
                  <option
                    key={time}
                    value={time}
                    disabled={
                      endTime
                        ? timeToMinutes(time) >= timeToMinutes(endTime)
                        : false
                    }
                  >
                    {time}
                  </option>
                ))}
              </Select>
            </HStack>
            <HStack>
              <Text w="10rem">End Time:</Text>
              <Select
                placeholder="End Time"
                w="15rem"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              >
                {timeOptions.map((time) => (
                  <option
                    key={time}
                    value={time}
                    disabled={
                      startTime
                        ? timeToMinutes(time) <= timeToMinutes(startTime)
                        : false
                    }
                  >
                    {time}
                  </option>
                ))}
              </Select>
            </HStack>
          </>
        )}
        {selectedDate && startTime && endTime && (
          <HStack>
            <Text w="10rem">Table:</Text>
            {availableTablesQuery.isLoading && <Spinner size="sm" mx="auto" />}
            {!availableTablesQuery.isLoading && (
              <>
                {!availableTablesQuery.data && (
                  <Text>Error reading available tables</Text>
                )}
                {availableTablesQuery.data && (
                  <>
                    {availableTablesQuery.data.length === 0 && (
                      <Text>No available tables</Text>
                    )}

                    {availableTablesQuery.data.length > 0 && (
                      <Select
                        placeholder="Restaurant Table"
                        w="15rem"
                        value={selectedTable}
                        onChange={(e) => setSelectedTable(e.target.value)}
                      >
                        {availableTablesQuery.data.map((table) => (
                          <option key={table.id} value={table.id}>
                            No. {table.number} - capacity {table.capacity}
                          </option>
                        ))}
                      </Select>
                    )}
                  </>
                )}
              </>
            )}
          </HStack>
        )}
        <Button
          w="100%"
          isDisabled={!selectedTable || isSubmitting}
          colorScheme="brand"
          onClick={handleSubmit}
        >
          Make reservation
        </Button>
      </Stack>
    </Card>
  );
};

export default ReservationForm;

const formatTime = (minutes: number) => {
  const hh = Math.floor(minutes / 60);
  const mm = minutes % 60;
  return `${hh < 10 ? "0" + hh : hh}:${mm === 0 ? "00" : mm}:00`;
};

const timeToMinutes = (time: string) => {
  const [hh, mm] = time.split(":");
  return parseInt(hh, 10) * 60 + parseInt(mm, 10);
};
