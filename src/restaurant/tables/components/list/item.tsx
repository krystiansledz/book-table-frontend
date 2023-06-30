import React from "react";
import { RestaurantTable } from "../../schemas.ts";
import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useCanEditRestaurant } from "../../../hooks.ts";
import RestaurantTableModalForm from "../form";

type Props = {
  restaurantTable: RestaurantTable;
};

const RestaurantsTableListItem: React.FC<Props> = ({ restaurantTable }) => {
  const isEditable = useCanEditRestaurant(restaurantTable.restaurant_id);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {isEditable && (
        <RestaurantTableModalForm
          restaurantId={restaurantTable.restaurant_id}
          isOpen={isOpen}
          onClose={onClose}
          restaurantTable={restaurantTable}
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
          <CardBody>
            <Heading size="md">{restaurantTable.number}</Heading>

            <Text pt="6">Capacity: {restaurantTable.capacity}</Text>
          </CardBody>
        </Stack>
      </Card>
    </>
  );
};

export default RestaurantsTableListItem;
