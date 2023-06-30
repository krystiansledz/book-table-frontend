import { Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import AppNavbarMenu from "./menu";
import AppNavbarLogo from "../../components/ui/logo.tsx";

const AppNavbar: React.FC = () => {
  return (
    <Flex
      bg={useColorModeValue("white", "gray.800")}
      borderBottom={1}
      borderStyle="solid"
      borderColor="brand.500"
      py={4}
      px={4}
    >
      <Flex flex={1}>
        <AppNavbarLogo />
      </Flex>

      <AppNavbarMenu />
    </Flex>
  );
};

export default AppNavbar;
