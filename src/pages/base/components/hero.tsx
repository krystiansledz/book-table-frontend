import React from "react";
import { Image, Heading, Text, Stack, Button } from "@chakra-ui/react";
import logo from "../../../assets/booktable-website-favicon-color.svg";
import ROUTES from "../../../routes";
import { Link } from "react-router-dom";
import { useIsUserAuthenticated } from "../../../user/hooks.ts";

const BasePageHero: React.FC = () => {
  const isAuthenticated = useIsUserAuthenticated();

  return (
    <>
      <Image src={logo} height="10rem" />
      <Heading
        fontWeight={600}
        fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
        lineHeight={"110%"}
      >
        Book table in <br />
        <Text as={"span"} color={"brand.400"}>
          your favourite restaurant
        </Text>
      </Heading>
      <Text color={"gray.500"}>
        Seamlessly book a table at your favorite restaurant with just a few
        clicks, avoiding wait times and guaranteeing an enjoyable dining
        experience. Choose your date and time, and let us handle the rest,
        offering a hassle-free service tailored to your preferences.
      </Text>
      <Stack
        direction={"row"}
        spacing={3}
        align={"center"}
        alignSelf={"center"}
        position={"relative"}
      >
        {!isAuthenticated && (
          <>
            <Link to={ROUTES.SignIn()}>
              <Button w={64}>Sign In</Button>
            </Link>
            <Link to={ROUTES.SignUp("CUSTOMER")}>
              <Button colorScheme="brand" w={64}>
                Create Account
              </Button>
            </Link>
          </>
        )}
        {isAuthenticated && (
          <Link to={ROUTES.Restaurants()}>
            <Button colorScheme="brand" w={64}>
              Find Restaurant
            </Button>
          </Link>
        )}
      </Stack>
    </>
  );
};

export default BasePageHero;
