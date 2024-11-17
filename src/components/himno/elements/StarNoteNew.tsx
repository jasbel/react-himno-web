import { useContext } from "react";
import { responsive } from "../../../res/responsive";
import Colors from "../../../res/colors";

import { useDisclosure } from "@hooks/use";
import { Flex, TextSingle } from "@components/ui";
import { AlertDialogStar } from "../../../elements/AlertDialog";
import { SongContext } from "../../../state/SongNewContext";
import StarIcon from "@/assets/icons/star";

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
    onOpen();
  };

  const onChangeToFavorite = () => {
    isFavorite ? rmToFav(songId) : addToFav(songId);
  };

  return (
    <Flex style={{alignItems:  "end", justifyContent: "center", flexDirection: 'column'}}>
      <TextSingle style={{fontWeight: "bold", fontSize: responsive(16, 14), color: Colors.txtPrimary}} >
        {musicalNote}
      </TextSingle>


      <AlertDialogStar
        onClose={onClose}
        onAccept={() => onChangeToFavorite()}
        open={isOpen}
        title={`${textFavAlert} ?`}
        description={`Segur@ que desea ${textFavAlert}`}
      >
      <StarIcon color={isFavorite ? Colors.select : Colors.unselect} size={24} onClick={() => onPreOpen()} />

      </AlertDialogStar>
    </Flex>
  );
};

export default StarNote;
