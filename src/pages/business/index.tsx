import React, { useEffect } from "react";
import { Divider } from "@chakra-ui/react";
import BusinessPageHero from "./components/hero.tsx";
import BusinessPageInstructions from "./components/instructions";
import { useIsUserCustomer } from "../../user/hooks.ts";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes";

const BusinessPage: React.FC = () => {
  const isCustomer = useIsUserCustomer();
  const navigate = useNavigate();

  useEffect(() => {
    if (isCustomer) navigate(ROUTES.Base(), { replace: true });
  }, [isCustomer]);

  return (
    <>
      <BusinessPageHero />
      <Divider bg={"brand.300"} />
      <BusinessPageInstructions />
    </>
  );
};

export default BusinessPage;
