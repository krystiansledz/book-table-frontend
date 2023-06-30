import React from "react";
import { useSearchParams } from "react-router-dom";
import { UserType } from "../../../user/types.ts";
import SignUpCustomerPage from "./signUpCustomer.tsx";
import SignUpRestaurantPage from "./signUpRestaurant.tsx";

const SignUpPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const type: UserType = (searchParams.get("type") ?? "CUSTOMER") as UserType;

  return (
    <>
      {type === "CUSTOMER" && <SignUpCustomerPage />}
      {type === "RESTAURANT" && <SignUpRestaurantPage />}
    </>
  );
};

export default SignUpPage;
