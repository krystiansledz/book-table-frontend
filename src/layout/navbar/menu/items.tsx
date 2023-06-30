import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Divider,
  Stack,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ROUTES from "routes";
import { FaListUl, FaPowerOff } from "react-icons/fa";
import { MdOutlineAddBusiness, MdOutlineBusiness } from "react-icons/md";
import { Icon } from "@chakra-ui/icons";
import {
  useIsUserAuthenticated,
  useIsUserCustomer,
  useIsUserRestaurant,
} from "../../../user/hooks.ts";
import { useAuthContext } from "../../../auth/provider.tsx";
import logo from "assets/booktable-website-favicon-white.svg";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AppNavbarMenuItems: React.FC<Props> = ({ isOpen, onClose }) => {
  const { signOut } = useAuthContext();
  const isAuthenticated = useIsUserAuthenticated();
  const isRestaurant = useIsUserRestaurant();
  const isCustomer = useIsUserCustomer();

  const closeMenuWithCallback = (callback: () => void) => () => {
    onClose();
    callback();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>My Account</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          {!isAuthenticated && (
            <Stack>
              <Link to={ROUTES.SignIn()} onClick={onClose}>
                <Button w="100%" onClick={onClose}>
                  Sign In
                </Button>
              </Link>
              <Link to={ROUTES.SignUp("CUSTOMER")}>
                <Button colorScheme="brand" w="100%" onClick={onClose}>
                  Create Account
                </Button>
              </Link>
            </Stack>
          )}
          {isAuthenticated && isCustomer && (
            <Stack>
              <Link to={ROUTES.Reservations()}>
                <Button
                  leftIcon={<Image src={logo} h={5} w={5} />}
                  variant="ghost"
                  w="100%"
                  justifyContent="left"
                  onClick={onClose}
                >
                  My Reservations
                </Button>
              </Link>
            </Stack>
          )}
          {isAuthenticated && isRestaurant && (
            <Stack>
              <Link to={ROUTES.RestaurantMy()}>
                <Button
                  leftIcon={<Icon as={MdOutlineBusiness} h={5} w={5} />}
                  variant="ghost"
                  w="100%"
                  justifyContent="left"
                  onClick={onClose}
                >
                  My Restaurant
                </Button>
              </Link>
            </Stack>
          )}
          <Divider my={6} />

          <Link to={ROUTES.Restaurants()}>
            <Button
              leftIcon={<Icon as={FaListUl} h={5} w={5} />}
              variant="ghost"
              w="100%"
              justifyContent="left"
              onClick={onClose}
            >
              Restaurants
            </Button>
          </Link>
          {!isAuthenticated && (
            <>
              <Divider my={6} />
              <Link to={ROUTES.Business()}>
                <Button
                  leftIcon={<Icon as={MdOutlineAddBusiness} h={6} w={6} />}
                  variant="ghost"
                  w="100%"
                  justifyContent="left"
                  onClick={onClose}
                >
                  BookTable for business
                </Button>
              </Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Divider my={6} />
              <Button
                leftIcon={<Icon as={FaPowerOff} h={5} w={5} />}
                variant="ghost"
                w="100%"
                justifyContent="left"
                onClick={closeMenuWithCallback(signOut)}
              >
                Sign Out
              </Button>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AppNavbarMenuItems;
