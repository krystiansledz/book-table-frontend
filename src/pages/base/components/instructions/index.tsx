import React from "react";
import { Box, SimpleGrid, Image } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import Instruction from "./instruction.tsx";
import { HiMagnifyingGlass, HiLockClosed } from "react-icons/hi2";
import logo from "assets/booktable-website-favicon-color.svg";

const BasePageInstructions: React.FC = () => {
  return (
    <Box p={4} py={{ base: 14, md: 20 }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Instruction
          icon={<Icon as={HiLockClosed} w={10} h={10} />}
          title={"Create Account"}
          text={
            "Begin your culinary journey by creating an account on our platform. This will allow you to manage your reservations and access exclusive deals."
          }
        />
        <Instruction
          icon={<Icon as={HiMagnifyingGlass} w={10} h={10} />}
          title={"Find Your Favourite Restaurant"}
          text={
            "Navigate our comprehensive directory of eateries. Use the search bar to find your preferred restaurant or discover new ones based on cuisine type or user ratings."
          }
        />
        <Instruction
          icon={<Image src={logo} w={10} h={10} />}
          title={"Choose Date and Table"}
          text={
            "Secure your dining experience by selecting your preferred date and time for your reservation. Check the availability of tables, choose the one you prefer."
          }
        />
      </SimpleGrid>
    </Box>
  );
};

export default BasePageInstructions;
