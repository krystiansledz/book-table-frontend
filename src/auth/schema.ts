import { z } from "zod";
import { requiredString } from "../utils/zod.ts";

// SIGN-IN

export const SignInFormSchema = z.object({
  email: requiredString.email(),
  password: requiredString,
});

export type SignInFormValues = z.infer<typeof SignInFormSchema>;

export const SignInFormDefaultValues = {
  email: "test@gmail.com",
  password: "test123",
} satisfies SignInFormValues;

// SIGN-UP

export const SignUpFormSchema = z.object({
  email: requiredString.email(),
  password: requiredString,
});

export const SignUpCustomerFormSchema = SignUpFormSchema.extend({
  userType: z.literal("CUSTOMER"),
});

export const SignUpRestaurantFormSchema = SignUpFormSchema.extend({
  name: requiredString,
  userType: z.literal("RESTAURANT"),
});

export type SignUpCustomerFormValues = z.infer<typeof SignUpCustomerFormSchema>;

export type SignUpRestaurantFormValues = z.infer<
  typeof SignUpRestaurantFormSchema
>;

export const SignUpCustomerFormDefaultValues = {
  email: "",
  password: "",
  userType: "CUSTOMER",
} satisfies SignUpCustomerFormValues;

export const SignUpRestaurantFormDefaultValues = {
  email: "",
  password: "",
  userType: "RESTAURANT",
  name: "",
} satisfies SignUpRestaurantFormValues;
