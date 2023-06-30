import React from "react";
import { useRestaurant } from "../../rquery.ts";
import {
  Spinner,
  Text,
  Card,
  Stack,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import PageTitle from "../../../components/ui/page/title.tsx";
import { useCanEditRestaurant } from "../../hooks.ts";
import { FaPen } from "react-icons/fa";
import RestaurantInfoModalForm from "./form.tsx";

type Props = {
  id: string;
};

const RestaurantInfo: React.FC<Props> = ({ id }) => {
  const query = useRestaurant(id);
  const isEditable = useCanEditRestaurant(id);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (query.isLoading) return <Spinner size="xl" mx="auto" />;

  if (!query.data) return <Text>Error</Text>;

  return (
    <>
      <RestaurantInfoModalForm
        restaurant={query.data}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Card p={4} textAlign="left">
        <Stack direction="row">
          <Stack flex={1}>
            <Stack direction="row" justifyContent="space-between">
              <PageTitle title={query.data.name} />
              {isEditable && (
                <IconButton
                  aria-label="Edit"
                  icon={<FaPen />}
                  onClick={onOpen}
                />
              )}
            </Stack>
            <Text pt="6">Address: {query.data.address}</Text>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

export default RestaurantInfo;
