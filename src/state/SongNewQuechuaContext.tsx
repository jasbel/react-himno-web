import React, { ReactNode, useEffect, useState } from "react";
import { ISong } from "../types/types";
import { addFav, deleteFav, findFav } from "../libs/storage";
import { removeAccents } from "../res/removeAccents";


interface InitialValues {
  songs: ISong[];
  songFavorites: ISong[];
  songsSearch: ISong[];
  addToFav: (favId: string) => void;
  changeSongBySearch: (q: string) => void;
  rmToFav: (favId: string) => void;
}

const defaultValue: InitialValues = {
  songs: [],
  songsSearch: [],
  songFavorites: [],
  addToFav: () => { },
  changeSongBySearch: () => { },
  rmToFav: () => { },
};

export const SongQuechuaContext = React.createContext<InitialValues>(defaultValue);

export const SongNewQuechuaProvider = ({ children }: { children: ReactNode }) => {
  const [songAll, setSongAll] = useState<ISong[]>([]);
  const [songs, setSongs] = useState<ISong[]>([]);
  const [songsSearch, setSongsSearch] = useState<ISong[]>([]);
  const [songFavorites, setSongFavorites] = useState<ISong[]>([]);

    const fetchData = async () => {
    try {
      const response = await fetch('/songs_quechua/data-quechua.json')
      if (!response.ok) {
        throw new Error('Failed to fetch config')
      }
      const configData = await response.json()
      setSongAll(configData)
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

      setSongs(songsFilter);
      setSongFavorites(favorites);
    } catch (error) {
      console.error("Get Favorites Err", error);
    }
  };

  const addToFav = (id: string) => {
    addFav(id);

    const itemToFav = songs.find((song) => song.id === id);
    if (!itemToFav) return;

    const cSongs = songs.filter((song) => song.id !== id);
    const cFavs = [...songFavorites, itemToFav];

    setSongs(cSongs);
    setSongFavorites(cFavs);
  };

  const rmToFav = (id: string) => {
    deleteFav(id);
    const itemToSong = songFavorites.find((song) => song.id === id);
    if (!itemToSong) return;

    const cFavs = songFavorites.filter((song) => song.id !== id);
    const cSongs = songs.filter((song) => song.id !== id);

    setSongs([...cSongs, itemToSong]);
    setSongFavorites(cFavs);
  };

  const changeSongBySearch = (query: string) => {
    if (!query.trim()) return setSongsSearch(songAll)

    const himnosFiltered = songAll.filter((himno) => {
      return (
        removeAccents(himno.title).toLowerCase().includes(removeAccents(query).toLowerCase()) ||
        removeAccents(himno.paragraphs[0].paragraph).toLowerCase().includes(removeAccents(query).toLowerCase())
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
        songs,
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
