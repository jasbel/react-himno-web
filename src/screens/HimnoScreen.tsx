import React, { useCallback, useEffect, useState } from "react";
import Colors from "../res/colors";
import HimnoSearch from "../components/himno/HimnoSearch";
import { songs as songsAll } from "../res/letters";
import HimnoItem from "../components/himno/HimnoItem";
import { titleApp } from "../res/constant";
import { removeAccents } from "../res/removeAccents";
import { Songs } from "../types/types";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import FavoriteEmptyState from "../components/favorite/FavoriteEmptyState";
import { useSong } from "../hooks/useSong";

const HimnoScreen = () => {
  const [songsSearch, setSongsSearch] = useState(songsAll);
  const [modeSearch, setModeSearch] = useState(false);
  const navigate = useNavigate();
  const  {songs, songFavorites} = useSong()

  const handlePress = useCallback(
    (himno: Songs) => {
      navigate("/himno-song", { state: { himno } });
    },
    [navigate]
  );

  const handleSearch = (query: string) => {
    query && !modeSearch && setModeSearch(true);
    !query && setModeSearch(false);

    const HimnosFiltered = songsAll.filter((himno) => {
      return (
        removeAccents(himno.title_es)
          .toLowerCase()
          .includes(removeAccents(query).toLowerCase()) ||
        removeAccents(himno.description_es)
          .toLowerCase()
          .includes(removeAccents(query).toLowerCase())
      );
    });

    setSongsSearch(HimnosFiltered);
  };

  return (
    <>
      <Hero title={titleApp} />

      <div style={styles.container}>
        <HimnoSearch onChange={handleSearch} modeSearch={modeSearch} />

        <div style={styles.contentItems}>
          {modeSearch && (
            <>
              {songsSearch.map((item, index) => {
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
            {!songFavorites.length && <FavoriteEmptyState />}
            {songFavorites.map((item) => (
              <HimnoItem
                key={item.id}
                item={item}
                onClick={() => handlePress(item)}
              />
            ))}
          </div>
          {!modeSearch && (
            <>
              {songs.map((item, index) => {
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
