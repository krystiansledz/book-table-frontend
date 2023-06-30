import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Container,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  SignInFormSchema,
  SignInFormValues,
  SignInFormDefaultValues,
} from "../../auth/schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "@emotion/styled";
import { useAuthContext } from "../../auth/provider.tsx";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes";
import PageTitle from "../../components/ui/page/title.tsx";
import useToasts from "../../components/ui/toast/useToasts.ts";

const SignInPage: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: SignInFormDefaultValues,
  });
  const { signIn } = useAuthContext();
  const navigate = useNavigate();
  const { fireSuccessToast, fireRequestErrorToast } = useToasts();

  const onSubmit = (data: SignInFormValues) => {
    signIn(data)
      .then(() => {
        fireSuccessToast("Logged in successfully!");
        navigate(ROUTES.Base());
      })
      .catch((error) => fireRequestErrorToast(error.message));
  };

  return (
    <Container maxW="md">
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <PageTitle title="Sign In" />

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

        <Button
          type="submit"
          isLoading={isSubmitting}
          w="full"
          colorScheme="brand"
        >
          Sign In
        </Button>
      </StyledForm>
    </Container>
  );
};

export default SignInPage;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
