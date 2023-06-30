import React, { PropsWithChildren } from "react";
import { ChakraBaseProvider, extendTheme } from "@chakra-ui/react";

type Props = PropsWithChildren;

const colors = {
  brand: {
    100: "#CAF0FD",
    200: "#96DCFB",
    300: "#61BFF3",
    400: "#3AA0E8",
    500: "#0074D9",
    600: "#0059BA",
    700: "#00429C",
    800: "#002F7D",
    900: "#002168",
  },
  background: {
    100: "#D3E2F7",
    200: "#A9C5F0",
    300: "#7598D3",
    400: "#4B6AA8",
    500: "#1D366F",
    600: "#15295F",
    700: "#0E1E4F",
    800: "#091440",
    900: "#050E35",
  },
};

const theme = extendTheme({
  colors,
});

const ThemeProvider: React.FC<Props> = ({ children }) => {
  return <ChakraBaseProvider theme={theme}>{children}</ChakraBaseProvider>;
};

export default ThemeProvider;
