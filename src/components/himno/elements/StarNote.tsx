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
    <Flex alignItems={'center'} justifyContent='center'>
      <Image src={isFavorite ? star : unstar} height={25} width={25} />
      <Text fontWeight="bold" fontSize={responsive(16, 14)} color={Colors.txtPrimary}>
        {musicalNote}
      </Text>
    </Flex>
  );
};

export default StarNote;

const styles: { [key in any]: React.CSSProperties } = {
  iconStar: {
    width: 25,
    height: 25,
  }
};
