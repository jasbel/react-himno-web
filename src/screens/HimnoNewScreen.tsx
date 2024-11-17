import React, { useCallback, useEffect, useState } from "react";
import Colors from "../res/colors";
import HimnoSearch from "../components/himno/HimnoSearch";
import HimnoItem from "../components/himno/HimnoItemNew";
import { titleApp } from "../res/constant";
import { removeAccents } from "../res/removeAccents";
import { ISong } from "../types/types";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import FavoriteEmptyState from "../components/favorite/FavoriteEmptyState";
import { useSong } from "../hooks/useNewSong";
import songsAll from "../assets/data-song.json";
import { ERoutes } from "../res/enum";

const HimnoNewScreen = () => {
  const [songsSearch, setSongsSearch] = useState(songsAll as unknown as ISong[]);
  const [modeSearch, setModeSearch] = useState(false);
  const navigate = useNavigate();
  const { songs, songFavorites } = useSong();

  const handlePress = useCallback(
    (himno: ISong) => {
      navigate('/' + ERoutes.item, { state: { himno } });
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

    setSongsSearch(HimnosFiltered as unknown as ISong[]);
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
                return <HimnoItem key={item.code} id={item.id}
                title={item.title}
                num={item.code}
                note={item.musicalNote}
                description={item.paragraphs[0].paragraph} onClick={() => handlePress(item)} />;
              })}
            </>
          )}

          {!modeSearch && (
            <>
              {!songFavorites.length && <FavoriteEmptyState />}

              {[...songFavorites, ...songs].map((item) => (
                <HimnoItem
                  key={item.code}
                  id={item.id}
                  title={item.title}
                  num={item.code}
                  note={item.musicalNote}
                  description={item.paragraphs[0].paragraph}
                  onClick={() => handlePress(item)} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HimnoNewScreen;

const styles: { [key in any]: React.CSSProperties } = {
  container: {
    flex: 1,
    backgroundColor: Colors.bkgWhite,
    paddingLeft: 12,
    paddingRight: 12,
  },
};
