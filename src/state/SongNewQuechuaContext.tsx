import React, { ReactNode, useEffect, useState } from "react";
import { ISong } from "../types/types";
import { addFav, deleteFav, findFav } from "../libs/storage";
import { removeAccents } from "../res/removeAccents";
import { getListSongQuechuaLocal } from "@/api/songLocalService";


interface InitialValues {
  songFavorites: ISong[];
  songsSearch: ISong[];
  addToFav: (favId: string) => void;
  changeSongBySearch: (q: string) => void;
  rmToFav: (favId: string) => void;
}

const defaultValue: InitialValues = {
  songsSearch: [],
  songFavorites: [],
  addToFav: () => { },
  changeSongBySearch: () => { },
  rmToFav: () => { },
};

export const SongQuechuaContext = React.createContext<InitialValues>(defaultValue);

export const SongNewQuechuaProvider = ({ children }: { children: ReactNode }) => {
  const [songAll, setSongAll] = useState<ISong[]>([]);
  const [songsFilter, setSongsFilter] = useState<ISong[]>([]);
  const [songsSearch, setSongsSearch] = useState<ISong[]>([]);
  const [songFavorites, setSongFavorites] = useState<ISong[]>([]);

    const fetchData = async () => {
    try {
      const configData = await getListSongQuechuaLocal()
      const _configData = configData.map(it => ({...it, description: it.paragraphs[0]?.paragraph || ""}))
      setSongAll(_configData)
      setSongsSearch(_configData)
    } catch (err) {
      // setError(err.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const getSongs = async () => {
    try {

      // const favIds = getFavs();
      const favorites = (songAll as unknown as ISong[]).filter((song) => !!findFav(song.id));
      const songsFilter = (songAll as unknown as ISong[]).filter((song) => !findFav(song.id));

      setSongsFilter(songsFilter);
      setSongFavorites(favorites);
    } catch (error) {
      console.error("Get Favorites Err", error);
    }
  };

  const addToFav = (id: string) => {
    addFav(id);

    const itemToFav = songsFilter.find((song) => song.id === id);
    if (!itemToFav) return;

    const cSongs = songsFilter.filter((song) => song.id !== id);
    const cFavs = [...songFavorites, itemToFav];

    setSongsFilter(cSongs);
    setSongFavorites(cFavs);
  };

  const rmToFav = (id: string) => {
    deleteFav(id);
    const itemToSong = songFavorites.find((song) => song.id === id);
    if (!itemToSong) return;

    const cFavs = songFavorites.filter((song) => song.id !== id);
    const cSongs = songsFilter.filter((song) => song.id !== id);

    setSongsFilter([...cSongs, itemToSong]);
    setSongFavorites(cFavs);
  };

  const changeSongBySearch = (query: string) => {
    if (!query.trim()) return setSongsSearch(songAll)

    const himnosFiltered = songAll.filter((himno) => {
      return (
        removeAccents(himno.title).toLowerCase().includes(removeAccents(query).toLowerCase()) ||
        removeAccents(himno.paragraphs[0]?.paragraph).toLowerCase().includes(removeAccents(query).toLowerCase())
      );
    });

    setSongsSearch(himnosFiltered);
  };

  useEffect(() => {
    getSongs();
    changeSongBySearch('');
  }, []);

  return (
    <SongQuechuaContext.Provider
      value={{
        songsSearch,
        songFavorites,
        addToFav,
        rmToFav,
        changeSongBySearch
      }}
    >
      {children}
    </SongQuechuaContext.Provider>
  );
};
