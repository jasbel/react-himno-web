import React, { useCallback, useEffect, useState } from "react";
import Colors from "../res/colors";
import HimnoSearch from "../components/himno/HimnoSearch";
import { songs } from "../res/letters";
import HimnoItem from "../components/himno/HimnoItem";
import { titleApp } from "../res/constant";
import Storage from "../libs/storage";
import { removeAccents } from "../res/removeAccents";
import { Songs } from "../types/types";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import FavoriteEmptyState from "../components/favorite/FavoriteEmptyState";

interface Props {}

const HimnoScreen = (props: Props) => {
  const [dataSearch, setDataSearch] = useState(songs);
  const [favorites, setFavorites] = useState([] as Songs[]);
  const [modeSearch, setModeSearch] = useState(false);
  const [dataMap, setDataMap] = useState(songs as Songs[]);
  const navigate = useNavigate();

  const getHimnos = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter((key: string | string[]) =>
        key.includes("favorite-")
      );
      const favs = await Storage.instance.multiGet(keys);
      const cFavorites = favs.map((fav: string[]) => JSON.parse(fav[1]));

      // const dataNotFavorite = songs.filter((himnoItem) => {
      //   const himno = cFavorites.filter((itemFav: { id: string }) => {
      //     return itemFav.id === himnoItem.id;
      //   });

      //   return himno.length ? false : true;
      // });
    } catch (error) {
      console.error("Get Favorites Err", error);
    }
  };

  const handlePress = useCallback(
    (himno: Songs) => {
      navigate("/himno-song", { state: { himno } });
    },
    [navigate]
  );

  const handleSearch = (query: string) => {
    query && !modeSearch && setModeSearch(true);
    !query && setModeSearch(false);

    const HimnosFiltered = songs.filter((himno) => {
      return (
        removeAccents(himno.title_es)
          .toLowerCase()
          .includes(removeAccents(query).toLowerCase()) ||
        removeAccents(himno.description_es)
          .toLowerCase()
          .includes(removeAccents(query).toLowerCase())
      );
    });

    setDataSearch(HimnosFiltered);

    !query && getHimnos();
  };

  useEffect(() => {
    getHimnos();
  }, []);

  /* useEffect(() => {
    const cData = !modeSearch ? noFavoritesData : dataSearch;
    setDataMap(cData);
  }, [modeSearch]); */

  return (
    <>
      <Hero title={titleApp} />

      <div style={styles.container}>
        <HimnoSearch onChange={handleSearch} modeSearch={modeSearch} />

        <div style={styles.contentItems}>
          {modeSearch && (
            <>
              {dataSearch.map((item, index) => {
                return (
                  <div key={index}>
                    <HimnoItem
                      key={item.id}
                      item={item}
                      onClick={() => handlePress(item)}
                    />
                  </div>
                );
              })}
            </>
          )}

          <div
            style={{
              borderTopWidth: 1,
              borderTopColor: Colors.bkgLight,
              borderBottomColor: Colors.yellow,
            }}
          >
            {!favorites.length && <FavoriteEmptyState />}

            {favorites.map((item) => (
              <HimnoItem
                key={item.id}
                item={item}
                onClick={() => handlePress(item)}
              />
            ))}
          </div>
          {!modeSearch && (
            <>
              {dataMap.map((item, index) => {
                return (
                  <div key={index}>
                    {/* {!modeSearch && index === 0 && <FavoriteScreen navigation={navigation} favorites={favorites} />} */}

                    <HimnoItem
                      key={item.id}
                      item={item}
                      onClick={() => handlePress(item)}
                    />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
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
  contentItems: {},
};
