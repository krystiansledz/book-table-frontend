import React from 'react';
import {Heading} from "@chakra-ui/react";

type Props = {
  title: string
}

const PageTitle: React.FC<Props> = ({title}) => {
  return (
    <Heading
      fontWeight={600}
      fontSize={{ base: "1xl", sm: "2xl", md: "4xl" }}
      lineHeight={"110%"}
    >
      {title}
    </Heading>
  );
};

export default PageTitle;
