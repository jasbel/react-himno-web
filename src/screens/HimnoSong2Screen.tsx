import { FC, useContext, useState } from "react";

// import LinearGradient from 'react-native-linear-gradient';
import ItemHimnoLetter, { ILetter } from "../components/himno/ItemHimnoLetter";
import { findFav } from "../libs/storage";
import Colors from "../res/colors";
import { responsive } from "../res/responsive";
import { IChoir2, ISong2 } from "../types/types";

import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import ButtonStar, { TypeStar } from "../components/ButtonStar";
import { SongContext } from "../state/SongContext";
import { Box, Flex } from "@chakra-ui/react";
import ButtonSingle from "../elements/ButtonSingle";
import { SettingContext } from "../state/SettingContext";

export const initialValues = {
  fontSize: responsive(80, 20),

  fontSizeIncremental: 1,
};

const initHimno: IHimno = {
  id: "",
  code: "",
  title: "",
  musicalNote: "_",
  paragraphs: [],
  chorus: [],
};

interface IHimno extends ISong2 {}

interface Props {}

const HimnoSong2Screen: FC<Props> = () => {
  const { addToFav, rmToFav } = useContext(SongContext);
  const { state } = useLocation() as { state: { himno: ISong2 } };
  const { decrementFontSize, incrementFontSize } = useContext(SettingContext);

  const [himno] = useState({
    ...initHimno,
    ...state.himno,
  } as IHimno);

  const { paragraphs, chorus, title: title_es } = state.himno;

  function compareArrayIgnore(arr: number[], val: number) {
    return arr.find((arrValue) => arrValue === val) ? false : true;
  }

  /* TODO: Mejorar la respuesta de indefinido, array vacio, o string vacio en choir y chorus */
  const verses: ILetter[] = paragraphs.map((item, i) => {
    let choirs = [] as string[];

    let filters: IChoir2[];
    if (chorus) {
      /* TODO: cambiar a real valor */
      filters = item.chorusPos.map((cp) => {
        return chorus[cp[0] - 1];
      });
      // chorus.filter((choir) => );
      choirs = filters.length ? joinChoirs(filters) : [];
    }

    choirs = choirs || [];

    return { ...item, choirs };
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

  function joinChoirs(filter: IChoir2[]): string[] {
    const filterChoir =
      filter.length >= 2
        ? filter.reduce(
            (accumulatorChoir, currentChoir, currentIndex) =>
              accumulatorChoir + currentChoir.choir + (filter.length !== currentIndex + 1 ? "\n\n" : ""),
            ""
          )
        : filter[0].choir;

    return [filterChoir];
  }

  return (
    <>
      <Hero title={title_es} hrefBefore={"/himnos"} />
      <Box p={1} py={6} bg={Colors.bkgWhite}>
        <div style={{ minHeight: "calc(100vh - 110px)" }}>
          {verses.map((item, index) => (
            <ItemHimnoLetter key={index} item={item} />
          ))}
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
