import React from "react";
import {
  Card,
  IconButton,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRestaurantBusinessHours } from "../../rquery.ts";
import RestaurantsBusinessHoursItem from "./item.tsx";
import PageTitle from "../../../../components/ui/page/title.tsx";
import { FaPlus } from "react-icons/fa";
import { useCanEditRestaurant } from "../../../hooks.ts";
import RestaurantBusinessHourModalForm from "../form";
import { daysOfWeek } from "../../const.ts";

type Props = {
  restaurantId: string | number;
};

const RestaurantBusinessHoursList: React.FC<Props> = ({ restaurantId }) => {
  const { data, isLoading } = useRestaurantBusinessHours(restaurantId);
  const isEditable = useCanEditRestaurant(restaurantId);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading) return <Spinner size="xl" mx="auto" />;

  if (!data) return <Text>Error</Text>;

  return (
    <>
      <RestaurantBusinessHourModalForm
        isOpen={isOpen}
        onClose={onClose}
        restaurantId={restaurantId}
      />
      <Card p={4} textAlign="left">
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <PageTitle title="Restaurant Business Hours" />
            {isEditable && data.length < 7 && (
              <IconButton aria-label="Add" icon={<FaPlus />} onClick={onOpen} />
            )}
          </Stack>
          <Stack>
            {data.length === 0 && <Text>Restaurant is closed</Text>}
            {data
              .sort((a, b) => {
                return (
                  daysOfWeek.indexOf(a.dayOfWeek) -
                  daysOfWeek.indexOf(b.dayOfWeek)
                );
              })
              .map((restaurantBusinessHour) => (
                <RestaurantsBusinessHoursItem
                  key={restaurantBusinessHour.id}
                  restaurantBusinessHour={restaurantBusinessHour}
                />
              ))}
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

export default RestaurantBusinessHoursList;
