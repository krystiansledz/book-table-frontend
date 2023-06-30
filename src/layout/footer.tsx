import React from "react";
import {
  Box,
  useColorModeValue,
  Container,
  Stack,
  Text,
  Button,
  VisuallyHidden,
} from "@chakra-ui/react";
import Logo from "components/ui/logo.tsx";
import { FaGithub } from "react-icons/fa";

const AppFooter: React.FC = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      mt={"auto"}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Logo />
        <Text>© 2023 Book Table. All rights reserved</Text>
        <Stack direction={"row"} spacing={6}>
          <Button
            bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
            rounded={"full"}
            w={8}
            h={8}
            cursor={"pointer"}
            as={"a"}
            href={"https://github.com/krystiansledz/book-table"}
            display={"inline-flex"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"background 0.3s ease"}
            _hover={{
              bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
            }}
          >
            <VisuallyHidden>GitHub</VisuallyHidden>
            <FaGithub />
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default AppFooter;
