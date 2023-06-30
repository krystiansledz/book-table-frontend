import React from "react";
import { Image, Heading, Text, Stack, Button } from "@chakra-ui/react";
import logo from "../../../assets/booktable-website-favicon-color.svg";
import ROUTES from "../../../routes";
import { Link } from "react-router-dom";
import { useIsUserAuthenticated } from "../../../user/hooks.ts";

const BusinessPageHero: React.FC = () => {
  const isAuthenticated = useIsUserAuthenticated();

  return (
    <>
      <Image src={logo} height="10rem" />
      <Heading
        fontWeight={600}
        fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
        lineHeight={"110%"}
      >
        {isAuthenticated ? "Manage" : "Register"} your <br />
        <Text as={"span"} color={"brand.400"}>
          restaurant
        </Text>
      </Heading>
      <Text color={"gray.500"}>
        Make it easy for food enthusiasts to discover and book a table at your
        restaurant. With just a few simple steps, you can ensure an organized
        dining service, improved customer experience, and greater visibility in
        the culinary scene. Set your availability, and we will handle the rest,
        providing a seamless service that suits your requirements.
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
            <Link to={ROUTES.SignUp("RESTAURANT")}>
              <Button colorScheme="brand" w={64}>
                Register Restaurant
              </Button>
            </Link>
          </>
        )}
        {isAuthenticated && (
          <Link to={ROUTES.RestaurantMy()}>
            <Button colorScheme="brand" w={64}>
              Manage Your Restaurant
            </Button>
          </Link>
        )}
      </Stack>
    </>
  );
};

export default BusinessPageHero;
