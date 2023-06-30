import React, { ReactElement } from "react";
import { Stack, Flex, Text } from "@chakra-ui/react";

type Props = {
  title: string;
  text: string;
  icon: ReactElement;
};

const BasePageInstruction: React.FC<Props> = ({ title, text, icon }) => {
  return (
    <Stack align={"center"}>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"brand.500"}
        rounded={"full"}
        bg={"gray.700"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={700} color={"brand.300"}>
        {title}
      </Text>
      <Text color={"gray.500"}>{text}</Text>
    </Stack>
  );
};

export default BasePageInstruction;
