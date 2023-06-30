import React from "react";
import { useUserContext } from "../../../user/provider.tsx";
import RestaurantInfo from "../../../restaurant/components/info";
import RestaurantTablesList from "../../../restaurant/tables/components/list";
import { Spinner } from "@chakra-ui/react";
import RestaurantBusinessHoursList from "../../../restaurant/businessHours/components/list";
import RestaurantRatings from "../../../restaurant/components/ratings";
import RestaurantTableReservations from "../../../restaurant/tables/components/reservations";

const RestaurantMyPage: React.FC = () => {
  const { user } = useUserContext();

  if (!user) return <Spinner size="xl" mx="auto" />;

  // type guard - should never happen
  if (!user.id) return null;

  return (
    <>
      <RestaurantInfo id={user?.id.toString()} />
      <RestaurantBusinessHoursList restaurantId={user.id} />
      <RestaurantRatings restaurantId={user.id} />
      <RestaurantTablesList restaurantId={user.id} />
      <RestaurantTableReservations restaurantId={user.id} />
    </>
  );
};

export default RestaurantMyPage;
