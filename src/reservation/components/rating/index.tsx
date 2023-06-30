import React, { useState } from "react";
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { putReservationRatingService } from "../../services.ts";
import useToasts from "../../../components/ui/toast/useToasts.ts";

type Props = {
  reservationId: string | number;
  isOpen: boolean;
  onClose: () => void;
};

const ReservationRatingModal: React.FC<Props> = ({
  reservationId,
  isOpen,
  onClose,
}) => {
  const [hover, setHover] = useState<number | null>(null);
  const [rating, setRating] = useState(3);
  const { fireSuccessToast, fireRequestErrorToast } = useToasts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    putReservationRatingService(reservationId, rating)
      .then(() => {
        fireSuccessToast("Rated");
        onClose();
      })
      .catch((error) => {
        fireRequestErrorToast(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Rating</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <HStack spacing={"2px"} justifyContent="center">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <Box
                  key={index}
                  color={
                    ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => setRating(ratingValue)}
                >
                  <FaStar cursor={"pointer"} size={20} />
                </Box>
              );
            })}
          </HStack>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="outline"
            colorScheme="brand"
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            colorScheme="brand"
            isDisabled={isSubmitting}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReservationRatingModal;
