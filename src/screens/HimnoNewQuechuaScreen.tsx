import React, { useCallback, useEffect, useState } from "react";
import Colors from "../res/colors";
import HimnoSearch from "../components/himno/HimnoSearch";
import HimnoItemNew from "../components/himno/HimnoItemNew";
import { titleApp } from "../res/constant";
import { removeAccents } from "../res/removeAccents";
import { ISongNew } from "../types/types";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import FavoriteEmptyState from "../components/favorite/FavoriteEmptyState";
import songsAll from "../assets/data-quechua.json";
import { useSongQuechua } from "../hooks/useNewQuechuaSong";
import { ERoutes } from "../res/enum";

const HimnoNewQuechuaScreen = () => {
  const [songsSearch, setSongsSearch] = useState(songsAll as unknown as ISongNew[]);
  const [modeSearch, setModeSearch] = useState(false);
  const navigate = useNavigate();
  const { songs, songFavorites } = useSongQuechua();

  const handlePress = useCallback(
    (himno: ISongNew) => {
      navigate(ERoutes.itemQuechua , { state: { himno } });
    },
    [navigate]
  );

  const handleSearch = (query: string) => {
    query && !modeSearch && setModeSearch(true);
    !query && setModeSearch(false);

    const HimnosFiltered = songsAll.filter((himno) => {
      return (
        removeAccents(himno.title).toLowerCase().includes(removeAccents(query).toLowerCase()) ||
        removeAccents(himno.paragraphs[0]?.paragraph).toLowerCase().includes(removeAccents(query).toLowerCase())
      );
    });

    setSongsSearch(HimnosFiltered as unknown as ISongNew[]);
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
                return <HimnoItemNew key={item.code} item={item} onClick={() => handlePress(item)} />;
              })}
            </>
          )}

          {!modeSearch && (
            <>
              {!songFavorites.length && <FavoriteEmptyState />}

              {songFavorites.map((item) => (
                <HimnoItemNew key={item.code} item={item} onClick={() => handlePress(item)} />
              ))}

              {songs.map((item) => {
                return <HimnoItemNew key={item.code} item={item} onClick={() => handlePress(item)} />;
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HimnoNewQuechuaScreen;

const styles: { [key in any]: React.CSSProperties } = {
  container: {
    flex: 1,
    backgroundColor: Colors.bkgWhite,
    paddingLeft: 12,
    paddingRight: 12,
  },
};
