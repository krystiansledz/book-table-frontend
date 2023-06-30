import React from "react";
import { MyReservation } from "../../schemas.ts";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { deleteReservationService } from "../../services.ts";
import useToasts from "../../../components/ui/toast/useToasts.ts";

type Props = {
  reservation: MyReservation;
  isOpen: boolean;
  onClose: () => void;
};

const ReservationDeleteAlert: React.FC<Props> = ({
  isOpen,
  onClose,
  reservation,
}) => {
  const cancelRef = React.useRef(null);
  const { fireSuccessToast, fireRequestErrorToast } = useToasts();

  const handleDelete = () => {
    deleteReservationService(reservation.id)
      .then(() => {
        fireSuccessToast("Deleted");
        onClose();
      })
      .catch((error) => fireRequestErrorToast(error));
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Reservation
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ReservationDeleteAlert;
