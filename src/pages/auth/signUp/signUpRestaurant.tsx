import React from "react";
import PageTitle from "components/ui/page/title.tsx";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  SignUpRestaurantFormDefaultValues,
  SignUpRestaurantFormSchema,
  SignUpRestaurantFormValues,
} from "../../../auth/schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes";
import styled from "@emotion/styled";
import { postSignUp } from "../../../auth/api.ts";
import useToasts from "../../../components/ui/toast/useToasts.ts";

const SignUpRestaurantPage: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignUpRestaurantFormValues>({
    resolver: zodResolver(SignUpRestaurantFormSchema),
    defaultValues: SignUpRestaurantFormDefaultValues,
  });
  const navigate = useNavigate();
  const { fireSuccessToast, fireRequestErrorToast } = useToasts();

  const onSubmit = (data: SignUpRestaurantFormValues) => {
    postSignUp(data)
      .then(() => {
        fireSuccessToast("Registered successfully!");
        navigate(ROUTES.Base());
      })
      .catch((error) => {
        fireRequestErrorToast(error);
      });
  };

  return (
    <Container maxW="md">
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <PageTitle title="Register Restaurant" />

        <FormControl id="email" isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Email" type="email" {...register("email")} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl id="password" isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Password"
            type="password"
            {...register("password")}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl id="name" isInvalid={!!errors.name}>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Name" type="text" {...register("name")} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          isLoading={isSubmitting}
          w="full"
          colorScheme="brand"
        >
          Register Restaurant
        </Button>
      </StyledForm>
    </Container>
  );
};

export default SignUpRestaurantPage;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
