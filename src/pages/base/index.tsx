import React, { useEffect } from "react";
import { Divider } from "@chakra-ui/react";
import BasePageHero from "./components/hero.tsx";
import BasePageInstructions from "./components/instructions";
import { useIsUserRestaurant } from "../../user/hooks.ts";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes";

const BasePage: React.FC = () => {
  const isRestaurant = useIsUserRestaurant();
  const navigate = useNavigate();

  useEffect(() => {
    if (isRestaurant) navigate(ROUTES.Business(), { replace: true });
  }, [isRestaurant]);

  return (
    <>
      <BasePageHero />
      <Divider bg={"brand.300"} />
      <BasePageInstructions />
    </>
  );
};

export default BasePage;
