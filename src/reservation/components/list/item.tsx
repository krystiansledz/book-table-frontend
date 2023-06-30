import React from "react";
import {
  Card,
  CardBody,
  Heading,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaStar, FaTrash } from "react-icons/fa";
import { MyReservation } from "../../schemas.ts";
import { DateTime } from "luxon";
import { Icon } from "@chakra-ui/icons";
import { BsPeopleFill } from "react-icons/bs";
import ReservationDeleteAlert from "../alert/delete.tsx";
import ReservationRatingModal from "../rating";

type Props = {
  reservation: MyReservation;
};

const MyReservationItem: React.FC<Props> = ({ reservation }) => {
  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose,
  } = useDisclosure();
  const {
    isOpen: isRatingModalOpen,
    onOpen: onRatingModalOpen,
    onClose: onRatingModalClose,
  } = useDisclosure();

  const canDelete =
    DateTime.now() < DateTime.fromISO(reservation.startDateTime);

  const canAddReview =
    DateTime.now() > DateTime.fromISO(reservation.endDateTime) &&
    !reservation.rating;

  return (
    <>
      {canDelete && (
        <ReservationDeleteAlert
          reservation={reservation}
          isOpen={isDeleteAlertOpen}
          onClose={onDeleteAlertClose}
        />
      )}
      {canAddReview && (
        <ReservationRatingModal
          reservationId={reservation.id}
          isOpen={isRatingModalOpen}
          onClose={onRatingModalClose}
        />
      )}
      <Card overflow="hidden" variant="outline" textAlign="left">
        <Stack>
          <CardBody p={2}>
            <Stack flexDir="row" justifyContent="space-between">
              <Heading size="md">{reservation.restaurant.name}</Heading>
              {canDelete && (
                <IconButton
                  aria-label="Delete"
                  icon={<FaTrash />}
                  onClick={onDeleteAlertOpen}
                />
              )}
              {canAddReview && (
                <IconButton
                  aria-label="Add review"
                  icon={<FaStar />}
                  onClick={onRatingModalOpen}
                />
              )}
              {reservation.rating && (
                <Stack direction="row" alignItems="center">
                  <Text>{reservation.rating}</Text>{" "}
                  <FaStar cursor={"pointer"} size={20} />
                </Stack>
              )}
            </Stack>

            <Text>
              Date:{" "}
              {DateTime.fromISO(reservation.startDateTime).toLocaleString(
                DateTime.DATE_SHORT
              )}
            </Text>
            <Text>
              Time:{" "}
              {DateTime.fromISO(reservation.startDateTime).toLocaleString(
                DateTime.TIME_SIMPLE
              )}{" "}
              -{" "}
              {DateTime.fromISO(reservation.endDateTime).toLocaleString(
                DateTime.TIME_SIMPLE
              )}
            </Text>
            <Text>
              Table: No. {reservation.restaurantTable.number} (
              <Icon as={BsPeopleFill} w={3} h={3} />{" "}
              {reservation.restaurantTable.capacity})
            </Text>
          </CardBody>
        </Stack>
      </Card>
    </>
  );
};

export default MyReservationItem;
