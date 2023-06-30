import React from "react";
import { useRestaurants } from "../../rquery.ts";
import { Stack, Spinner, Text } from "@chakra-ui/react";
import RestaurantsListItem from "./item.tsx";

type Props = {
  searchParams?: string;
};

const RestaurantsList: React.FC<Props> = ({ searchParams }) => {
  const query = useRestaurants(searchParams);

  if (query.isLoading) return <Spinner size="xl" mx="auto" />;

  if (!query.data) return <Text>Error</Text>;

  return (
    <Stack>
      {query.data.map((restaurant) => (
        <RestaurantsListItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </Stack>
  );
};

export default RestaurantsList;
