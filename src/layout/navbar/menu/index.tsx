import React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Button, useDisclosure } from "@chakra-ui/react";
import AppNavbarMenuItems from "./items.tsx";

const AppNavbarMenu: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button color="brand.500" onClick={onOpen}>
        <HamburgerIcon w={5} h={5} />
      </Button>
      <AppNavbarMenuItems isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AppNavbarMenu;
