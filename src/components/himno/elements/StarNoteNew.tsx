import React, { useContext } from "react";
import { responsive } from "../../../res/responsive";
import Colors from "../../../res/colors";

import star from "../../../assets/images/star.png";
import unstar from "../../../assets/images/unstar.png";
import { Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { AlertDialog } from "../../../elements/AlertDialog";
import { SongContext } from "../../../state/SongNewContext";

interface Props {
  songId: string;
  isFavorite: boolean;
  musicalNote: string;
}

const StarNote = ({ isFavorite, musicalNote, songId }: Props) => {
  const { addToFav, rmToFav } = useContext(SongContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const textFavAlert = isFavorite ? "Quitar de favoritos" : "Agregar a favoritos";

  const onPreOpen = () => {
    // alert('Click en estrellas')
    onOpen();
  };

  const onChangeToFavorite = () => {
    isFavorite ? rmToFav(songId) : addToFav(songId);
  };

  return (
    <Flex alignItems={{ base: "end", sm: "center" }} justifyContent="center" flexDir={{ base: "column", sm: "row" }}>
      <Text fontWeight="bold" fontSize={responsive(16, 14)} color={Colors.txtPrimary} noOfLines={1}>
        {musicalNote}
      </Text>
      <Image
        src={isFavorite ? star : unstar}
        height={{ base: 6, md: 8 }}
        width={{ base: 6, md: 8 }}
        onClick={() => onPreOpen()}
      />

      <AlertDialog
        onClose={onClose}
        onAccept={() => onChangeToFavorite()}
        open={isOpen}
        title={`${textFavAlert} ?`}
        description={`Segur@ que desea ${textFavAlert}`}
      />
    </Flex>
  );
};

export default StarNote;
