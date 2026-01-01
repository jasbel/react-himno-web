import { useContext } from "react";
import { responsiveCalc } from "@/utils/responsive";
import Colors from "@/utils/colors";

import { useDisclosure } from "@hooks/use";
import { Flex, TextSingle } from "@components/ui";
import { AlertDialogStar } from "@/components/elements/AlertDialog";
import { SongNewContext } from "../../../state/SongNewContext";
import StarIcon from "@/assets/icons/star";
import { SongQchContext } from "@/state/SongQchContext";

interface Props {
  songId: string;
  isFavorite: boolean;
  musicalNote: string;
  refresh: () => void;
}

const StarNote = ({ isFavorite, musicalNote, songId, refresh}: Props) => {
  const { addToFav: addToFav1, rmToFav: rmToFav1 } = useContext(SongNewContext);
  const { addToFav: addToFav2, rmToFav: rmToFav2 } = useContext(SongQchContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const textFavAlert = isFavorite
    ? "Quitar de favoritos"
    : "Agregar a favoritos";

  const onChangeToFavorite = () => {
    isFavorite ? rmToFav1(songId) : addToFav1(songId);
    isFavorite ? rmToFav2(songId) : addToFav2(songId);

    refresh()
  };

  return (
    <Flex
      style={{
        alignItems: "end",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <TextSingle
        style={{
          fontWeight: "bold",
          fontSize: responsiveCalc(16, 14),
          color: Colors.txtPrimary,
        }}
      >
        {musicalNote}
      </TextSingle>

      <AlertDialogStar
        onClose={onClose}
        onAccept={() => onChangeToFavorite()}
        open={isOpen}
        title={`${textFavAlert} ?`}
        description={`Segur@ que desea ${textFavAlert}`}
      >
        <StarIcon
          color={isFavorite ? Colors.select : Colors.unselect}
          size={24}
          onClick={() => onOpen()}
        />
      </AlertDialogStar>
    </Flex>
  );
};

export default StarNote;
