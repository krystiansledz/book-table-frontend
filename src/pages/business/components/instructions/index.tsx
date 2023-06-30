import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import Instruction from "./instruction.tsx";
import { HiMagnifyingGlass, HiLockClosed, HiPencil } from "react-icons/hi2";

const BusinessPageInstructions: React.FC = () => {
  return (
    <Box p={4} py={{ base: 14, md: 20 }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Instruction
          icon={<Icon as={HiLockClosed} w={10} h={10} />}
          title={"Create Account"}
          text={
            "Kickstart your online presence by setting up a restaurant account on our platform. This will not only make your restaurant accessible to more diners but also allow you to manage bookings efficiently and access analytics."
          }
        />
        <Instruction
          icon={<Icon as={HiPencil} w={10} h={10} />}
          title={"Manage Table Availability"}
          text={
            "Have complete control over your table availability. Specify the number of tables and their seating capacity. Also, set your business hours, allowing you to prepare for a seamless dining experience for your customers."
          }
        />
        <Instruction
          icon={<Icon as={HiMagnifyingGlass} w={10} h={10} />}
          title={"Monitor Reservations"}
          text={
            "Gain insights into your reservations. Keep track of bookings. This function allows for real-time monitoring of your dining service, ensuring a smooth operation and satisfied customers."
          }
        />
      </SimpleGrid>
    </Box>
  );
};

export default BusinessPageInstructions;
