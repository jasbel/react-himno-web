import React, { useEffect, useState } from "react";

// import LinearGradient from 'react-native-linear-gradient';
import ItemHimnoLetter from "../components/himno/ItemHimnoLetter";
import Storage from "../libs/storage";
import Colors from "../res/colors";
import { responsive } from "../res/responsive";
import { opacityColor } from "../helpers/helper";
import { Songs } from "../types/types";

const widthScreen = 1440;

const initialValues = {
  fontSize: responsive(28, 23, widthScreen),
  fontSizeIncremental: 1,
};

const initHimno: IHimno = {
  id: "",
  num_song: "",
  title_es: "",
  description_es: "",
  musicalNote: "_",
  paragraphs: [],
  chorus: [],
};

interface IHimno extends Songs {
  // id: string;
  // paragraphs: string[];
  // chorus: string[];
  // title_es: string;
}

interface Props {}

const HimnoSongScreen = (props: Props) => {
  // const { route, navigation } = props;
  const [isFavorite, setIsFavorite] = useState(false);
  // const [himno, setHimno] = useState(route.params.himno);
  const [himno, setHimno] = useState(initHimno as IHimno);
  const { paragraphs, chorus } = himno;
  const [customFontSize, setCustomFontSize] = useState(initialValues.fontSize);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  const addFavorite = async () => {
    const himnoStr = JSON.stringify(himno);
    const key = `favorite-${himno.id}`;

    const stored = await Storage.instance.store(key, himnoStr);

    if (stored) {
      setIsFavorite(true);
    }
  };

  const handleRemove = async () => {
    const key = `favorite-${himno.id}`;
    await Storage.instance.remove(key);

    setIsFavorite(false);
  };

  const removeFavorite = async () => {
    if (window.confirm("Esta de acuerdo en Borrar... ?")) {
      handleRemove();
    }
  };

  const getFavorite = async () => {
    try {
      const key = `favorite-${himno.id}`;

      const favStr = await Storage.instance.get(key);

      if (favStr !== null) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.log(" Get Favorite Error:  ", error);
    }
  };

  /* TODO: mejorar la respuesta de indefinido , array vacio, o string vacio en choir y chorus */
  const verses = paragraphs.map((item: any, i: number) => {
    let choir = "";

    let filter;
    if (chorus !== undefined) {
      filter = chorus.filter((choirItem: { chorus_position_ignore: any }) =>
        compareArrayIgnore(choirItem.chorus_position_ignore, i + 1)
      );
      choir = filter.length && joinChoirs(filter);
    }

    choir = choir || "";

    return { ...item, choir };
  });

  function compareArrayIgnore(arr: any[], val: any) {
    return arr.find((arrValue: any) => arrValue === val) ? false : true;
  }

  function joinChoirs(filter: any[]) {
    return filter.length >= 2
      ? filter.reduce(
          (accumulatorChoir: any, currentChoir: { choir: any }, currentIndex: number) =>
            accumulatorChoir + currentChoir.choir + (filter.length !== currentIndex + 1 ? "\n\n" : ""),
          ""
        )
      : filter[0].choir;
  }

  const getIconStar = () => {
    if (isFavorite) {
      return "../assets/images/star.png";
    }

    if (!isFavorite) {
      return "../assets/images/unstar-white.png";
    }
  };

  const onPressFontSize = (valueFontSize: number) => {
    setCustomFontSize((cFontSize: any) => cFontSize + valueFontSize);
  };

  const getInit = () => {
    // navigation.setOptions({
    //   title: initHimno.title_es,
    //   headerStyle: {
    //     backgroundColor: Colors.bkgDark,
    //   },
    //   headerTintColor: Colors.txtWhite,
    //   headerRight: () => (
    //     <div style={styles.headerRightContainer}>
    //       <button
    //         color={Colors.bkgTransparentPrimary}
    //         onClick={() => onPressFontSize(-initialValues.fontSizeIncremental)}
    //         title="-T"
    //       />
    //       <button
    //         color={Colors.bkgTransparentPrimary}
    //         onClick={() => onPressFontSize(initialValues.fontSizeIncremental)}
    //         title="+T"
    //       />
    //     </div>
    //   ),
    // });
    setHimno(initHimno);
  };

  useEffect(() => {
    getInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getFavorite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [himno]);

  const fav = isFavorite ? styles.containerFloatFavorite : {};

  return (
    <div style={styles.container}>
      <div style={styles.spaceTop}>
        {/* <LinearGradient
          style={styles.spaceLinearGradient}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1.0}}
          colors={[Colors.bkgWhite, Colors.bkgTransparentWhite]}
        /> */}
      </div>
      <div>
        {verses.map((item, index: React.Key) => {
          return (
            <ItemHimnoLetter key={index} item={item} isFinalVerse={verses.length - 1 === index} customFontSize={customFontSize} />
          );
        })}
      </div>

      <button
        onClick={() => toggleFavorite()}
        style={{
          ...styles.containerFloat,
          ...fav,
        }}
      >
        <img style={styles.iconStar} src={getIconStar()} />
      </button>
    </div>
  );
};

const styles: { [key in any]: React.CSSProperties } = {
  container: {
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: Colors.bkgWhite,
    position: "relative",
  },
  headerRightContainer: {
    flexDirection: "row",
  },
  spaceTop: {
    position: "absolute",
    top: 0,
    width: widthScreen,
    zIndex: 10,
    borderBottomColor: opacityColor(Colors.bkgWhite, 0.5),
    borderBottomWidth: 4,
  },
  spaceLinearGradient: {
    height: 18,
    width: "100%",
  },
  containerFloat: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: Colors.bkgTransparentPrimary,
    borderRadius: 50,
  },
  containerFloatFavorite: {
    backgroundColor: Colors.bkgTransparentDark,
  },
  iconStar: {
    margin: 6,
    width: 30,
    height: 30,
  },
  content: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  paragraph: {
    fontFamily: "sans-serif-medium",
    textAlign: "center",
    color: Colors.txtBlack,
  },
  containerIconChoir: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -15,
    marginBottom: 15,
    width: 170,
  },
  iconChoir: {
    width: 170,
    height: 15,
  },
  choir: {
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "italic",
    color: Colors.txtDark,
  },
  spaceBottom: {
    height: 48,
  },
};

export default HimnoSongScreen;
