import React, { ReactNode, useEffect, useState } from "react";
import { ISong } from "../types/types";
import songAll from "../assets/data-song.json";
import { addFav, deleteFav, findFav } from "../libs/storage";
import { removeAccents } from "@/res/removeAccents";

const songAllSearch: ISong[] = (songAll as ISong[]).map(s => ({
  'id': s.id,
  'code': s.code,
  'title': s.title,
  'musicalNote': s.musicalNote,
  paragraphs: s.paragraphs,
  chorus: s.chorus,
}))

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

export const SongContext = React.createContext<InitialValues>(defaultValue);

export const SongNewProvider = ({ children }: { children: ReactNode }) => {
  const [songs, setSongs] = useState<ISong[]>([]);
  const [songsSearch, setSongsSearch] = useState<ISong[]>([]);
  const [songFavorites, setSongFavorites] = useState<ISong[]>([]);

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
    if (!query.trim()) return setSongsSearch(songAllSearch)

    const himnosFiltered = songAllSearch.filter((himno) => {
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
    <SongContext.Provider value={{
      songs,
      songsSearch,
      songFavorites,
      addToFav,
      rmToFav,
      changeSongBySearch
    }}>
      {children}
    </SongContext.Provider>
  );
};
