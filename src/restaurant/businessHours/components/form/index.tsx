import React from "react";
import {
  getRestaurantBusinessHourFormDefaultValues,
  RestaurantBusinessHour,
  RestaurantBusinessHourFormSchema,
  RestaurantBusinessHourFormValues,
} from "../../schemas.ts";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useToasts from "components/ui/toast/useToasts.ts";
import {
  deleteRestaurantBusinessHourService,
  postRestaurantBusinessHourService,
  putRestaurantBusinessHourService,
} from "../../services.ts";
import { daysOfWeek } from "../../const.ts";

type Props = {
  restaurantId: string | number;
  restaurantBusinessHour?: RestaurantBusinessHour;
  isOpen: boolean;
  onClose: () => void;
};

const RestaurantBusinessHourModalForm: React.FC<Props> = ({
  restaurantId,
  restaurantBusinessHour,
  isOpen,
  onClose,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RestaurantBusinessHourFormValues>({
    resolver: zodResolver(RestaurantBusinessHourFormSchema),
    defaultValues: getRestaurantBusinessHourFormDefaultValues(
      restaurantBusinessHour
    ),
  });
  const { fireSuccessToast, fireRequestErrorToast } = useToasts();
  const isEditMode = !!restaurantBusinessHour;

  const onSubmit = (data: RestaurantBusinessHourFormValues) => {
    if (isEditMode) {
      putRestaurantBusinessHourService(
        restaurantId,
        restaurantBusinessHour.id,
        data
      )
        .then(() => {
          fireSuccessToast("Edited");
          onClose();
        })
        .catch((error) => fireRequestErrorToast(error));
    } else {
      postRestaurantBusinessHourService(restaurantId, data)
        .then(() => {
          fireSuccessToast("Added");
          onClose();
        })
        .catch((error) => fireRequestErrorToast(error));
    }
  };

  const handleDelete = () => {
    if (isEditMode)
      deleteRestaurantBusinessHourService(
        restaurantId,
        restaurantBusinessHour.id
      )
        .then(() => {
          fireSuccessToast("Deleted");
          onClose();
        })
        .catch((error) => fireRequestErrorToast(error));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            {isEditMode ? "Edit" : "Add"} Restaurant BusinessHour
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Stack gap={4}>
              <FormControl id="dayOfWeek" isInvalid={!!errors.dayOfWeek}>
                <FormLabel>Number</FormLabel>
                <Select placeholder="Day of week" {...register("dayOfWeek")}>
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.dayOfWeek?.message}</FormErrorMessage>
              </FormControl>

              <FormControl id="openingTime" isInvalid={!!errors.openingTime}>
                <FormLabel>Opening Time</FormLabel>
                <Select placeholder="Opening Time" {...register("openingTime")}>
                  {TimeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.openingTime?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl id="closingTime" isInvalid={!!errors.closingTime}>
                <FormLabel>Closing Time</FormLabel>
                <Select placeholder="Closing Time" {...register("closingTime")}>
                  {TimeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.closingTime?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter
            justifyContent={isEditMode ? "space-between" : undefined}
          >
            {isEditMode && (
              <Button colorScheme="red" mr={3} onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Stack direction="row">
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
                type="submit"
              >
                {isEditMode ? "Edit" : "Add"}
              </Button>
            </Stack>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default RestaurantBusinessHourModalForm;

const TimeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
  const hh = Math.floor(i / 2);
  const mm = 30 * (i % 2);
  return `${hh < 10 ? "0" : ""}${hh}:${mm === 0 ? "00" : mm}:00`;
});
