import React, { FC, useContext, useEffect, useState } from "react";

// import LinearGradient from 'react-native-linear-gradient';
import ItemHimnoLetter from "../components/himno/ItemHimnoLetter";
import { addFav, deleteFav, findFav } from "../libs/storage";
import Colors from "../res/colors";
import { responsive } from "../res/responsive";
import { opacityColor } from "../helpers/helper";
import { IChoir, ISong } from "../types/types";

import { useLocation, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import ButtonStar, { TypeStar } from "../components/ButtonStar";
import { SongContext } from "../state/SongContext";
import { useSetting } from "../hooks/useSetting";
import { Box, Flex } from "@chakra-ui/react";
import ButtonHero from "../elements/ButtonHero";
import { SettingContext } from "../state/SettingContext";

export const initialValues = {
  fontSize: responsive(80, 20),

  fontSizeIncremental: 1,
};

const initHimno: IHimno = {
  id: "lorem ipsum",
  num_song: "lorem ipsum",
  title: "lorem ipsum",
  description: "lorem ipsum",
  musicalNote: "_",
  paragraphs: [],
  chorus: [],
};

interface IHimno extends ISong {}

interface Props {}

const HimnoSongScreen: FC<Props> = () => {
  const { addToFav, rmToFav } = useContext(SongContext);
  const { state } = useLocation() as { state: { himno: ISong } };
  const { decrementFontSize, incrementFontSize } = useContext(SettingContext);

  const [himno] = useState({
    ...initHimno,
    ...state.himno,
  } as IHimno);

  const { paragraphs, chorus, title: title_es } = state.himno;
  /* TODO: Mejorar la respuesta de indefinido, array vacio, o string vacio en choir y chorus */
  const verses = paragraphs.map((item, i) => {
    let choir = "lorem ipsum";

    let filter: IChoir[];
    if (chorus) {
      filter = chorus.filter((choir) => compareArrayIgnore(choir.noPositions, i + 1));
      choir = filter.length ? joinChoirs(filter) : "";
    }

    choir = choir || "";

    return { ...item, choir };
  });

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

  function compareArrayIgnore(arr: number[], val: number) {
    return arr.find((arrValue) => arrValue === val) ? false : true;
  }

  function joinChoirs(filter: IChoir[]) {
    const filterChoir =
      filter.length >= 2
        ? filter.reduce(
            (accumulatorChoir, currentChoir, currentIndex) =>
              accumulatorChoir + currentChoir.choir + (filter.length !== currentIndex + 1 ? "\n\n" : ""),
            ""
          )
        : filter[0].choir;

    return filterChoir;
  }

  return (
    <>
      <Hero title={title_es} hrefBefore={"/himno"} />
      <Box p={1} py={6} bg={Colors.bkgWhite}>
        <div style={{ minHeight: "calc(100vh - 110px)" }}>
          {verses.map((item, index) => (
            <ItemHimnoLetter key={index} item={item} />
          ))}
        </div>
      </Box>
      <Box position={"sticky"} bottom={0}>
        <Flex position={"absolute"} bottom={0} left={0} zIndex={1}>
          <ButtonHero title="-T" onClick={() => decrementFontSize()} />

          <ButtonHero title="+T" onClick={() => incrementFontSize()} />
        </Flex>
      </Box>
      <ButtonStar initStar={!!findFav(himno.id)} onToggle={toggleFavorite} />
    </>
  );
};

export default HimnoSongScreen;
