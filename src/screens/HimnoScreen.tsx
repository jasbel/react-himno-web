import React, { useEffect, useState } from "react";
import Colors from "../res/colors";
import HimnoSearch from "../components/himno/HimnoSearch";
import { songs } from "../res/letters";
import HimnoItem from "../components/himno/HimnoItem";
import { titleApp } from "../res/constant";
import Favorites from "../components/favorite/Favorites";
import Storage from "../libs/storage";
import { removeAccents } from "../res/removeAccents";
import { Songs } from "../types/types";
import { responsive } from "../res/responsive";

interface Props {}

const HimnoScreen = (props: Props) => {
  const [dataSearch, setDataSearch] = useState(songs);
  const [noFavoritesData, setNoFavoriteData] = useState([] as any);
  const [favorites, setFavorites] = useState([] as any);
  const [modeSearch, setModeSearch] = useState(false);
  const [dataMap, setDataMap] = useState(songs as any[]);

  const getHimnos = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter((key: string | string[]) => key.includes("favorite-"));
      const favs = await Storage.instance.multiGet(keys);
      const cFavorites = favs.map((fav: string[]) => JSON.parse(fav[1]));

      const dataNotFavorite = songs.filter((himnoItem) => {
        const himno = cFavorites.filter((itemFav: { id: string }) => {
          return itemFav.id === himnoItem.id;
        });

        return himno.length ? false : true;
      });
      setFavorites(cFavorites);
      setNoFavoriteData(dataNotFavorite);
    } catch (error) {
      console.log("Get Favorites Err", error);
    }
  };

  const handlePress = (himno: Songs) => {
    /* props.navigation.navigate("HimnoSongScreen", { himno }); */
    setModeSearch(false);
  };

  const handleSearch = (query: string) => {
    query && !modeSearch && setModeSearch(true);
    !query && setModeSearch(false);

    const HimnosFiltered = songs.filter((himno) => {
      return (
        removeAccents(himno.title_es).toLowerCase().includes(removeAccents(query).toLowerCase()) ||
        removeAccents(himno.description_es).toLowerCase().includes(removeAccents(query).toLowerCase())
      );
    });

    setDataSearch(HimnosFiltered);

    !query && getHimnos();
  };

  // useEffect(() => {
  //   navigation.setOptions({
  //     title: titleApp,
  //     headerTitleStyle: {
  //       fontWeight: "bold",
  //       textTransform: "uppercase",
  //       fontSize: responsive(23, 20),
  //     },
  //   });
  //   const unsubscribe = navigation.addListener("focus", () => getHimnos());
  //   return unsubscribe;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    getHimnos();

    //   const unsubscribe = navigation.addListener("focus", () => getHimnos());
    //   return () => {
    //     unsubscribe;
    //   };
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [navigation]);
  }, []);

  /* useEffect(() => {
    const cData = !modeSearch ? noFavoritesData : dataSearch;
    setDataMap(cData);
  }, [modeSearch]); */

  return (
    <div style={styles.container}>
      <HimnoSearch onChange={handleSearch} modeSearch={modeSearch} />

      <div style={styles.contentItems}>
        {dataMap.map((item, index) => {
          return (
            <div key={index}>
              {/* {!modeSearch && index === 0 && <FavoriteScreen navigation={navigation} favorites={favorites} />} */}
              {!modeSearch && index === 0 && <Favorites favorites={favorites} />}

              <HimnoItem key={item.id} item={item} onClick={() => handlePress(item)} />
            </div>
          );
        })}
      </div>

      {/* {!noFavoritesData.length && <FavoriteScreen navigation={navigation} favorites={favorites} />} */}
      {!noFavoritesData.length && <Favorites favorites={favorites} />}
    </div>
  );
};

export default HimnoScreen;

const styles: { [key in any]: React.CSSProperties } = {
  container: {
    flex: 1,
    backgroundColor: Colors.bkgWhite,
    paddingLeft: 12,
    paddingRight: 12,
  },
  contentItems: {
    paddingTop: 12,
  },
};
