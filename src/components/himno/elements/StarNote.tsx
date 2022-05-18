import React from "react";
import { responsive } from "../../../res/responsive";
import Colors from "../../../res/colors";

import star from "../../../assets/images/star.png";
import unstar from "../../../assets/images/unstar.png";
import { Flex, Image, Text } from "@chakra-ui/react";

interface Props {
  isFavorite: boolean;
  musicalNote: string;
}

const StarNote = ({ isFavorite, musicalNote }: Props) => {
  return (
    <Flex alignItems={{base: 'end', sm: 'center'}} justifyContent='center' flexDir={{base: 'column', sm: 'row'}}>
      <Text fontWeight="bold" fontSize={responsive(16, 14)} color={Colors.txtPrimary} noOfLines={1}>
        {musicalNote}
      </Text>
      <Image src={isFavorite ? star : unstar} height={responsive(35, 27)} width={responsive(35, 28)} />
    </Flex>
  );
};

export default StarNote;
