import React from "react";
import { RestaurantBusinessHour } from "../../schemas.ts";
import { useCanEditRestaurant } from "../../../hooks.ts";
import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import RestaurantBusinessHourModalForm from "../form";

type Props = {
  restaurantBusinessHour: RestaurantBusinessHour;
};

const RestaurantsBusinessHoursItem: React.FC<Props> = ({
  restaurantBusinessHour,
}) => {
  const isEditable = useCanEditRestaurant(restaurantBusinessHour.restaurant_id);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {isEditable && (
        <RestaurantBusinessHourModalForm
          restaurantId={restaurantBusinessHour.restaurant_id}
          isOpen={isOpen}
          onClose={onClose}
          restaurantBusinessHour={restaurantBusinessHour}
        />
      )}
      <Card
        overflow="hidden"
        variant="outline"
        textAlign="left"
        cursor={isEditable ? "pointer" : "inherit"}
        _hover={isEditable ? { bg: "gray.900" } : undefined}
        onClick={isEditable ? onOpen : undefined}
      >
        <Stack>
          <CardBody p={2}>
            <Stack flexDir="row" justifyContent="space-between">
              <Heading size="md">
                {restaurantBusinessHour.dayOfWeek.toLocaleUpperCase()}
              </Heading>

              <Text>
                {restaurantBusinessHour.openingTime} -{" "}
                {restaurantBusinessHour.closingTime}
              </Text>
            </Stack>
          </CardBody>
        </Stack>
      </Card>
    </>
  );
};

export default RestaurantsBusinessHoursItem;
