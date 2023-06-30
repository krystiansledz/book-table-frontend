import React from "react";
import {
  getRestaurantTableFormDefaultValues,
  RestaurantTable,
  RestaurantTableFormSchema,
  RestaurantTableFormValues,
} from "../../schemas.ts";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useToasts from "components/ui/toast/useToasts.ts";
import {
  deleteRestaurantTableService,
  postRestaurantTableService,
  putRestaurantTableService,
} from "../../services.ts";

type Props = {
  restaurantId: string | number;
  restaurantTable?: RestaurantTable;
  isOpen: boolean;
  onClose: () => void;
};

const RestaurantTableModalForm: React.FC<Props> = ({
  restaurantId,
  restaurantTable,
  isOpen,
  onClose,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RestaurantTableFormValues>({
    resolver: zodResolver(RestaurantTableFormSchema),
    defaultValues: getRestaurantTableFormDefaultValues(restaurantTable),
  });
  const { fireSuccessToast, fireRequestErrorToast } = useToasts();
  const isEditMode = !!restaurantTable;

  const onSubmit = (data: RestaurantTableFormValues) => {
    if (isEditMode) {
      putRestaurantTableService(restaurantId, restaurantTable.id, data)
        .then(() => {
          fireSuccessToast("Edited");
          onClose();
        })
        .catch((error) => fireRequestErrorToast(error));
    } else {
      postRestaurantTableService(restaurantId, data)
        .then(() => {
          fireSuccessToast("Added");
          onClose();
        })
        .catch((error) => fireRequestErrorToast(error));
    }
  };

  const handleDelete = () => {
    if (isEditMode)
      deleteRestaurantTableService(restaurantId, restaurantTable.id)
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
            {isEditMode ? "Edit" : "Add"} Restaurant Table
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Stack gap={4}>
              <FormControl id="number" isInvalid={!!errors.number}>
                <FormLabel>Number</FormLabel>
                <Input
                  placeholder="Number"
                  type="number"
                  {...register("number", { valueAsNumber: true })}
                />
                <FormErrorMessage>{errors.number?.message}</FormErrorMessage>
              </FormControl>

              <FormControl id="capacity" isInvalid={!!errors.capacity}>
                <FormLabel>Capacity</FormLabel>
                <Input
                  placeholder="Capacity"
                  type="number"
                  {...register("capacity", { valueAsNumber: true })}
                />
                <FormErrorMessage>{errors.capacity?.message}</FormErrorMessage>
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

export default RestaurantTableModalForm;
