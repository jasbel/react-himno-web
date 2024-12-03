import { FC, useContext } from "react";

import ItemHimnoLetter, { ILetter } from "../components/himno/ItemHimnoLetter";
import Colors from "../res/colors";
import { responsive } from "../res/responsive";
import { IChoirOld, ISongOld } from "../types/types";

import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import { SongContext } from "../state/SongContext";
import { Box } from "@components/ui";
import { ERoutes } from "../res/enum";
import HimnoSongFooter from "@/components/himno/HimnoSongFooter";

export const initialValues = {
  fontSize: responsive(80, 20),

  fontSizeIncremental: 1,
};

interface Props {}

const HimnoSongScreenOld: FC<Props> = () => {
  const { addToFav, rmToFav } = useContext(SongContext);
  const { state } = useLocation() as { state: { himno: ISongOld } };

  const { paragraphs, chorus, title: title_es } = state.himno;
  /* TODO: Mejorar la respuesta de indefinido, array vacio, o string vacio en choir y chorus */
  const verses: ILetter[] = paragraphs.map((item, i) => {
    let choirs = [] as string[];

    let filter: IChoirOld[];
    if (chorus) {
      filter = chorus.filter((choir) => compareArrayIgnore(choir.noPositions, i + 1));
      choirs = filter.length ? joinChoirs(filter) : [];
    }

    choirs = choirs || "";

    return { ...item, choirs };
  });

  function compareArrayIgnore(arr: number[], val: number) {
    return arr.find((arrValue) => arrValue === val) ? false : true;
  }

  function joinChoirs(filter: IChoirOld[]): string[] {
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
      <Hero title={title_es} hrefBefore={'/' + ERoutes.home} />

      <Box style={{ padding: 1, paddingTop: 6,paddingBottom: 6, backgroundColor: Colors.bkgWhite}}>
        <div style={{ minHeight: "calc(100vh - 110px)" }}>
          {verses.map((item, index) => (
            <ItemHimnoLetter key={index} item={item} />
          ))}
        </div>
      </Box>
      
      <HimnoSongFooter id={state.himno.id} add={addToFav} remove={rmToFav} />
      
    </>
  );
};

export default HimnoSongScreenOld;
