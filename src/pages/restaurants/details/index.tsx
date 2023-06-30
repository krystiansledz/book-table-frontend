import React from "react";
import { useParams } from "react-router-dom";
import RestaurantInfo from "../../../restaurant/components/info";
import { Text } from "@chakra-ui/react";
import RestaurantTablesList from "../../../restaurant/tables/components/list";
import RestaurantBusinessHoursList from "../../../restaurant/businessHours/components/list";
import RestaurantRatings from "../../../restaurant/components/ratings";
import RestaurantTableReservations from "../../../restaurant/tables/components/reservations";
import { useUserContext } from "../../../user/provider.tsx";
import ReservationForm from "../../../reservation/components/form";

const RestaurantDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUserContext();

  if (!id) return <Text>Error</Text>;

  return (
    <>
      <RestaurantInfo id={id} />
      <RestaurantBusinessHoursList restaurantId={id} />
      <RestaurantRatings restaurantId={id} />
      <RestaurantTablesList restaurantId={id} />
      <RestaurantTableReservations restaurantId={id} />
      {user?.userType === "CUSTOMER" && <ReservationForm restaurantId={id} />}
    </>
  );
};

export default RestaurantDetailsPage;
