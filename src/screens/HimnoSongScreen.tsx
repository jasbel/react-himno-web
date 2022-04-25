import React, { useContext, useEffect, useState } from "react";

// import LinearGradient from 'react-native-linear-gradient';
import ItemHimnoLetter from "../components/himno/ItemHimnoLetter";
import { addFav, deleteFav, findFav } from "../libs/storage";
import Colors from "../res/colors";
import { responsive } from "../res/responsive";
import { opacityColor } from "../helpers/helper";
import { Chorus, Songs } from "../types/types";


import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import ButtonStar, { TypeStar } from "../components/ButtonStar";
import { SongContext } from "../state/SongContext";

export const initialValues = {
  fontSize: responsive(80, 20),

  fontSizeIncremental: 1,
};

const initHimno: IHimno = {
  id: "lorem ipsum",
  num_song: "lorem ipsum",
  title_es: "lorem ipsum",
  description_es: "lorem ipsum",
  musicalNote: "_",
  paragraphs: [],
  chorus: [],
};

interface IHimno extends Songs {}

interface Props {}

const HimnoSongScreen = (props: Props) => {
  const {addToFav, rmToFav} =  useContext(SongContext)
  const { state } = useLocation() as { state: { himno: Songs } };

  const [himno, setHimno] = useState({
    ...initHimno,
    ...state.himno,
  } as IHimno);
  const [customFontSize, setCustomFontSize] = useState(initialValues.fontSize);

  const { paragraphs, chorus, title_es } = state.himno;
  /* TODO: Mejorar la respuesta de indefinido, array vacio, o string vacio en choir y chorus */
  const verses = paragraphs.map((item, i) => {
    let choir = "lorem ipsum";

    let filter: Chorus[];
    if (chorus) {
      filter = chorus.filter((choir) =>
        compareArrayIgnore(choir.noPositions, i + 1)
      );
      choir = filter.length ? joinChoirs(filter) : "";
    }

    choir = choir || "";

    return { ...item, choir };
  });

  const toggleFavorite = (star: TypeStar) => {
    if (star === 'star') addFavorite();
    else {
      if (window.confirm("Esta de acuerdo en Borrar... ?")) handleRemove();
    }
  };

  const addFavorite = async () => {
    addToFav(himno.id)
  };

  const handleRemove = () => {
    rmToFav(himno.id)
  };

  function compareArrayIgnore(arr: number[], val: number) {
    return arr.find((arrValue) => arrValue === val) ? false : true;
  }

  function joinChoirs(filter: Chorus[]) {
    const filterChoir =
      filter.length >= 2
        ? filter.reduce(
            (accumulatorChoir, currentChoir, currentIndex) =>
              accumulatorChoir +
              currentChoir.choir +
              (filter.length !== currentIndex + 1 ? "\n\n" : ""),
            ""
          )
        : filter[0].choir;

    return filterChoir;
  }

  return (
    <div style={styles.container}>
      <Hero
        title={title_es}
        changeFontSize={(valueFontSize) =>
          setCustomFontSize((cFontSize) => cFontSize + valueFontSize)
        }
      />
      <div style={styles.spaceTop} />
      <div style={{ minHeight: "calc(100vh - 110px)" }}>
        {verses.map((item, index) => (
          <ItemHimnoLetter
            key={index}
            item={item}
            isFinalVerse={verses.length - 1 === index}
            customFontSize={customFontSize}
          />
        ))}
      </div>

      <ButtonStar initStar={!!findFav(himno.id)} onToggle={toggleFavorite} />
    </div>
  );
};

export default HimnoSongScreen;

const styles: { [key in any]: React.CSSProperties } = {
  container: {
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: Colors.bkgWhite,
    position: "relative",
  },

  spaceTop: {
    position: "absolute",
    top: 0,
    width: innerWidth,
    zIndex: 10,
    borderBottomColor: opacityColor(Colors.bkgWhite, 0.5),
    borderBottomWidth: 4,
  },
};
