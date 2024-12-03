import { FC, useContext } from "react";

import { Box, Flex } from "@components/ui";
import ButtonSingle from "@/elements/ButtonSingle";
import { responsiveStr } from "@/utils/responsive";
import { ID } from "@/types/types";
import { SettingContext } from "@/state/SettingContext";
import ButtonStar, { TypeStar } from "../ButtonStar";
import { findFav } from "@/libs/storage";

export const initialValues = {
  fontSize: responsiveStr(80, 20),

  fontSizeIncremental: 1,
};

interface Props {
  id: ID;
  add: (favId: string) => void;
  remove: (favId: string) => void
}

const HimnoSongFooter: FC<Props> = ({id, add, remove}) => {
  const { decrementFontSize, incrementFontSize } = useContext(SettingContext);

  const toggleFavorite = (star: TypeStar) => {
    if (star === "star") addFavorite();
    else {
      if (window.confirm("Esta de acuerdo en Borrar... ?")) handleRemove();
    }
  };

  const addFavorite = async () => {
    add(id);
  };

  const handleRemove = () => {
    remove(id);
  };

  return (
    <>
      <Box style={{position: "sticky", bottom: 0}}>
        <Flex style={{position: "absolute", bottom: 0, left: 0, zIndex:1}}>
          <ButtonSingle title="-T" onClick={() => decrementFontSize()} />

          <ButtonSingle title="+T" onClick={() => incrementFontSize()} />
        </Flex>
      </Box>
      
      <ButtonStar initStar={!!findFav(id)} onToggle={toggleFavorite} />
    </>
  );
};

export default HimnoSongFooter;
