import React from "react";
import { useRestaurantRatings } from "../../rquery.ts";
import { Card, HStack, Progress, Spinner, Stack, Text } from "@chakra-ui/react";
import PageTitle from "../../../components/ui/page/title.tsx";
import { FaStar } from "react-icons/fa";

type Props = {
  restaurantId: string | number;
};

const RestaurantRatings: React.FC<Props> = ({ restaurantId }) => {
  const { data, isLoading } = useRestaurantRatings(restaurantId);

  if (isLoading) return <Spinner size="xl" mx="auto" />;

  if (!data) return <Text>Error</Text>;

  const ratingsCount = Object.values(data).reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  const totalRating =
    Object.entries(data).reduce(
      (previousValue, [rating, count]) => previousValue + +rating * count,
      0
    ) / ratingsCount;

  return (
    <Card p={4} textAlign="left">
      <Stack>
        <HStack justifyContent="space-between">
          <PageTitle title="Restaurant Ratings" />
          {ratingsCount && (
            <HStack>
              <FaStar size={20} />
              <Text>
                {totalRating.toFixed(2)} ({ratingsCount})
              </Text>
            </HStack>
          )}
        </HStack>
        {Object.entries(data)
          .sort((a, b) => +b[0] - +a[0])
          .map(([rating, count]) => (
            <HStack key={rating}>
              <Text width="25px">{rating}</Text>
              <Progress
                value={ratingsCount ? (count / ratingsCount) * 100 : 0}
                flex={1}
              />
              {ratingsCount && (
                <Text width="50px">
                  {((count / ratingsCount) * 100).toFixed(0)}%
                </Text>
              )}
            </HStack>
          ))}
      </Stack>
    </Card>
  );
};

export default RestaurantRatings;
