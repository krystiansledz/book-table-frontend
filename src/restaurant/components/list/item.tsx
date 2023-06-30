import React from "react";
import { Restaurant } from "../../schemas.ts";
import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ROUTES from "../../../routes";

type Props = {
  restaurant: Restaurant;
};

const RestaurantsListItem: React.FC<Props> = ({ restaurant }) => {
  return (
    <Link to={ROUTES.RestaurantDetails(restaurant.id)}>
      <Card
        overflow="hidden"
        variant="outline"
        w="full"
        cursor="pointer"
        _hover={{ bg: "gray.900" }}
        textAlign="left"
      >
        <Stack>
          <CardBody>
            <Heading size="md">{restaurant.name}</Heading>

            <Text pt="6">Address: {restaurant.address}</Text>
            <Text>No. tables: {restaurant.restaurantTables.length}</Text>
            {restaurant.rating && (
              <Text>Rating: {restaurant.rating.toFixed(2)}/5.0</Text>
            )}
          </CardBody>

          <CardFooter>
            <Button variant="solid" colorScheme="brand" w="full">
              Show Details
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </Link>
  );
};

export default RestaurantsListItem;
