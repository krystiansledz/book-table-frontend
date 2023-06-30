import React from "react";
import {
  getRestaurantFormDefaultValues,
  Restaurant,
  RestaurantFormSchema,
  RestaurantFormValues,
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
import useToasts from "../../../components/ui/toast/useToasts.ts";
import { putRestaurantService } from "../../services.ts";

type Props = {
  restaurant: Restaurant;
  isOpen: boolean;
  onClose: () => void;
};

const RestaurantInfoModalForm: React.FC<Props> = ({
  restaurant,
  isOpen,
  onClose,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RestaurantFormValues>({
    resolver: zodResolver(RestaurantFormSchema),
    defaultValues: getRestaurantFormDefaultValues(restaurant),
  });
  const { fireSuccessToast, fireRequestErrorToast } = useToasts();

  const onSubmit = async (data: RestaurantFormValues) => {
    await putRestaurantService(restaurant.id, data)
      .then(() => {
        fireSuccessToast("Edited");
        onClose();
      })
      .catch((error) => fireRequestErrorToast(error));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit Restaurant Info</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Stack gap={4}>
              <FormControl id="name" isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Name" type="text" {...register("name")} />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>

              <FormControl id="address" isInvalid={!!errors.address}>
                <FormLabel>Address</FormLabel>
                <Input
                  placeholder="Name"
                  type="text"
                  {...register("address")}
                />
                <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
              </FormControl>
            </Stack>
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
            <Button colorScheme="brand" isDisabled={isSubmitting} type="submit">
              Edit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default RestaurantInfoModalForm;
