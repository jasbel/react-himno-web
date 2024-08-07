import React, { useCallback, useEffect, useState } from "react";
import Colors from "../res/colors";
import HimnoSearch from "../components/himno/HimnoSearch";
// import { songs as songsAll } from "../res/letters";
import HimnoItem from "../components/himno/HimnoItem";
import { titleApp } from "../res/constant";
import { removeAccents } from "../res/removeAccents";
import { ISong } from "../types/types";
import { json, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import FavoriteEmptyState from "../components/favorite/FavoriteEmptyState";
import { useSong } from "../hooks/useSong";

const songsAll: ISong[] = [];

const HimnoScreen = () => {
  const [songsSearch, setSongsSearch] = useState(songsAll);
  const [modeSearch, setModeSearch] = useState(false);
  const navigate = useNavigate();
  const { songs, songFavorites } = useSong();

  const handlePress = useCallback(
    (himno: ISong) => {
      navigate("/himno-song", { state: { himno } });
    },
    [navigate]
  );

  const handleSearch = (query: string) => {
    query && !modeSearch && setModeSearch(true);
    !query && setModeSearch(false);

    const HimnosFiltered = songsAll.filter((himno) => {
      return (
        removeAccents(himno.title).toLowerCase().includes(removeAccents(query).toLowerCase()) ||
        removeAccents(himno.description).toLowerCase().includes(removeAccents(query).toLowerCase())
      );
    });

    setSongsSearch(HimnosFiltered);
  };

  

  return (
    <>
      <Hero title={titleApp} hrefBefore={"/"} hiddenFS />

      <div style={styles.container}>
        <HimnoSearch onChange={handleSearch} modeSearch={modeSearch} />

        <div>
          {modeSearch && (
            <>
              {songsSearch.map((item) => {
                return <HimnoItem key={item.id} item={item} onClick={() => handlePress(item)} />;
              })}
            </>
          )}

          {!modeSearch && (
            <>
              {!songFavorites.length && <FavoriteEmptyState />}
              {songFavorites.map((item) => (
                <HimnoItem key={item.id} item={item} onClick={() => handlePress(item)} />
              ))}
              {songs.map((item) => {
                return <HimnoItem key={item.id} item={item} onClick={() => handlePress(item)} />;
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
};
