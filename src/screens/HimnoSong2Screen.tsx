import { FC, useContext, useState } from "react";
import { findFav } from "../libs/storage";
import Colors from "../res/colors";
import { responsive } from "../res/responsive";
import { ISongNew } from "../types/types";

import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import ButtonStar, { TypeStar } from "../components/ButtonStar";
import { SongContext } from "../state/SongContext";
import { Box, Flex } from "@components/ui";
import ButtonSingle from "../elements/ButtonSingle";
import { SettingContext } from "../state/SettingContext";
import WrapItemHimno from "../components/himno/WrapItemHimno";
import { ERoutes } from "../res/enum";

export const initialValues = {
  fontSize: responsive(80, 20),

  fontSizeIncremental: 1,
};

const initHimno: ISongNew = {
  id: "",
  code: "",
  title: "",
  musicalNote: "_",
  paragraphs: [],
  chorus: [],
};

interface Props {}

const HimnoSong2Screen: FC<Props> = () => {
  const { addToFav, rmToFav } = useContext(SongContext);
  const { state } = useLocation() as { state: { himno: ISongNew } };
  const { decrementFontSize, incrementFontSize } = useContext(SettingContext);

  const [himno] = useState({
    ...initHimno,
    ...state.himno,
  } as ISongNew);

  const { paragraphs, chorus, title } = state.himno;

  const toggleFavorite = (star: TypeStar) => {
    if (star === "star") addFavorite();
    else {
      if (window.confirm("Esta de acuerdo en Borrar... ?")) handleRemove();
    }
  };

  const addFavorite = async () => {
    addToFav(himno.id);
  };

  const handleRemove = () => {
    rmToFav(himno.id);
  };

  return (
    <>
      <Hero title={title} hrefBefore={'/' + ERoutes.home} />

      <Box p={1} py={6} bg={Colors.bkgWhite}>
        <div style={{ minHeight: "calc(100vh - 110px)" }}>
          <WrapItemHimno paragraphs={paragraphs} chorus={chorus || []} />
        </div>
      </Box>

      <Box position={"sticky"} bottom={0}>
        <Flex position={"absolute"} bottom={0} left={0} zIndex={1}>
          <ButtonSingle title="-T" onClick={() => decrementFontSize()} />

          <ButtonSingle title="+T" onClick={() => incrementFontSize()} />
        </Flex>
      </Box>
      
      <ButtonStar initStar={!!findFav(himno.id)} onToggle={toggleFavorite} />
    </>
  );
};

export default HimnoSong2Screen;
