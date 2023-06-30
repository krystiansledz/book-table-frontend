import React, { PropsWithChildren } from "react";
import AppNavbar from "./navbar";
import styled from "@emotion/styled";
import AppFooter from "./footer.tsx";
import { Box, Stack, Container } from "@chakra-ui/react";

type Props = PropsWithChildren;

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <AppContainer>
      <AppNavbar />

      <Container maxW={"4xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 14, md: 20 }}
        >
          {children}
        </Stack>
      </Container>
      <AppFooter />
    </AppContainer>
  );
};

export default AppLayout;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
`;
