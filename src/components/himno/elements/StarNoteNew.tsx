import { useContext } from "react";
import { responsive } from "../../../res/responsive";
import Colors from "../../../res/colors";

import { useDisclosure } from "@hooks/use";
import { Flex, TextSingle } from "@components/ui";
import { AlertDialog } from "../../../elements/AlertDialog";
import { SongContext } from "../../../state/SongNewContext";
import StarIcon from "@/src/assets/icons/star";

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
    <Flex  style={{alignItems:  "end", justifyContent: "center", flexDirection: 'column'}}>
      <TextSingle style={{fontWeight: "bold", fontSize: responsive(16, 14), color: Colors.txtPrimary}} >
        {musicalNote}
      </TextSingle>

      <StarIcon color={isFavorite ? Colors.select : Colors.unselect} size={24} onClick={() => onPreOpen()} />

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
