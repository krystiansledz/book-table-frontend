import React from "react";
import { useRestaurantTables } from "../../rquery.ts";
import {
  Card,
  IconButton,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import PageTitle from "../../../../components/ui/page/title.tsx";
import { FaPlus } from "react-icons/fa";
import { useCanEditRestaurant } from "../../../hooks.ts";
import RestaurantTableModalForm from "../form";
import RestaurantsTableListItem from "./item.tsx";

type Props = {
  restaurantId: string | number;
};

const RestaurantTablesList: React.FC<Props> = ({ restaurantId }) => {
  const { data, isLoading } = useRestaurantTables(restaurantId);
  const isEditable = useCanEditRestaurant(restaurantId);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading) return <Spinner size="xl" mx="auto" />;

  if (!data) return <Text>Error</Text>;

  return (
    <>
      <RestaurantTableModalForm
        restaurantId={restaurantId}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Card p={4} textAlign="left">
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <PageTitle title="Restaurant Tables" />
            {isEditable && (
              <IconButton aria-label="Add" icon={<FaPlus />} onClick={onOpen} />
            )}
          </Stack>
          <Stack direction="row" flexWrap="wrap">
            {data.length === 0 && <Text>No tables in restaurant</Text>}
            {data.map((restaurantTable) => (
              <RestaurantsTableListItem
                key={restaurantTable.id}
                restaurantTable={restaurantTable}
              />
            ))}
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

export default RestaurantTablesList;
