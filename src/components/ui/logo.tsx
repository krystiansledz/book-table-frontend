import React from "react";

import logo from "assets/booktable-low-resolution-logo-color-on-transparent-background.svg";
import styled from "@emotion/styled";
import { Button } from "@chakra-ui/react";
import ROUTES from "routes";
import { Link } from "react-router-dom";

const AppNavbarLogo: React.FC = () => {
  return (
    <Link to={ROUTES.Base()}>
      <Button bg="transparent">
        <Logo src={logo} alt="BookTable" />
      </Button>
    </Link>
  );
};

export default AppNavbarLogo;

const Logo = styled.img`
  width: 4rem;
`;
