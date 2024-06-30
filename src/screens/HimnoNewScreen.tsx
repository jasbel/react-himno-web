import React, { useCallback, useEffect, useState } from "react";
import Colors from "../res/colors";
import HimnoSearch from "../components/himno/HimnoSearch";
import { songs as songsAll } from "../res/letters-new";
import HimnoItem from "../components/himno/HimnoItem2";
import { titleApp } from "../res/constant";
import { removeAccents } from "../res/removeAccents";
import { ISong2 } from "../types/types";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import FavoriteEmptyState from "../components/favorite/FavoriteEmptyState";
import { useSong } from "../hooks/useNewSong";

const HimnoNewScreen = () => {
  const [songsSearch, setSongsSearch] = useState(songsAll as unknown as ISong2[]);
  const [modeSearch, setModeSearch] = useState(false);
  const navigate = useNavigate();
  const { songs, songFavorites } = useSong();

  const [data, seData] = useState([]);


  const handlePress = useCallback(
    (himno: ISong2) => {
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

    setSongsSearch(HimnosFiltered as unknown as ISong2[]);
  };

  const getData = async () => {
    const res = await fetch("../data.json");
    const data = await res.json();

    console.log({ data });
    seData(data);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Hero title={titleApp} hrefBefore={"/"} hiddenFS/>

      <div style={styles.container}>
        <HimnoSearch onChange={handleSearch} modeSearch={modeSearch} />

<pre>{JSON.stringify(data, null, 3)}</pre>


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

export default HimnoNewScreen;

const styles: { [key in any]: React.CSSProperties } = {
  container: {
    flex: 1,
    backgroundColor: Colors.bkgWhite,
    paddingLeft: 12,
    paddingRight: 12,
  },
};
