import React from "react";
import { Heading, Text, Button, Box } from "@chakra-ui/react";
import ROUTES from "routes";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  return (
    <>
      <Box textAlign="center" py={10} px={6}>
        <Heading display="inline-block" as="h2" size="2xl" color="brand.400">
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color={"gray.400"} mb={6}>
          The page you're looking for does not seem to exist
        </Text>
        <Link to={ROUTES.Base()}>
          <Button colorScheme="brand" px={6}>
            Go Home
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default ErrorPage;
