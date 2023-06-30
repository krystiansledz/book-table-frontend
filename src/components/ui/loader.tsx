import React from "react";
import styled from "@emotion/styled";
import Logo from "../../assets/booktable-high-resolution-logo-color-on-transparent-background.svg";
import { Image } from "@chakra-ui/react";

const Loader: React.FC = () => {
  return (
    <Container>
      <Image src={Logo} alt="Loading" w="50%" />
    </Container>
  );
};

export default Loader;

const Container = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
