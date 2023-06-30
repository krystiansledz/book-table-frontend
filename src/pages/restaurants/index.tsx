import React, { useMemo, useState } from "react";
import PageTitle from "../../components/ui/page/title.tsx";
import RestaurantsList from "../../restaurant/components/list";
import { Button, Card, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";

const RestaurantsPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sortNameDirection, setSortNameDirection] = useState<
    "none" | "desc" | "asc"
  >("desc");

  const searchParams = useMemo(() => {
    const searchParams = new URLSearchParams();
    if (search) searchParams.append("name", search);
    if (sortNameDirection) {
      searchParams.append("sortBy", "name");
      searchParams.append("direction", sortNameDirection);
    }

    return searchParams.toString();
  }, [search, sortNameDirection]);

  const handleToggleSortName = () => {
    if (sortNameDirection === "none") setSortNameDirection("desc");
    if (sortNameDirection === "desc") setSortNameDirection("asc");
    if (sortNameDirection === "asc") setSortNameDirection("none");
  };

  return (
    <>
      <PageTitle title="Restaurants" />

      <Card p={4} direction="row" alignItems="flex-end">
        <FormControl id="search">
          <FormLabel>Search</FormLabel>
          <Input
            autoComplete="off"
            placeholder="Search by Name"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </FormControl>

        <Button
          ml={5}
          w="10rem"
          onClick={handleToggleSortName}
          rightIcon={
            sortNameDirection !== "none" ? (
              sortNameDirection === "desc" ? (
                <ArrowDownIcon />
              ) : (
                <ArrowUpIcon />
              )
            ) : undefined
          }
          variant="outline"
        >
          Name
        </Button>
      </Card>

      <RestaurantsList
        searchParams={searchParams.length > 0 ? searchParams : undefined}
      />
    </>
  );
};

export default RestaurantsPage;
