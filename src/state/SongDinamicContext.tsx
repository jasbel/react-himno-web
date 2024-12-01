import React, { ReactNode, useEffect, useState } from "react";
import { ISong } from "../types/types";
import { addFav, deleteFav } from "../libs/storage";
import { removeAccents } from "@/res/removeAccents";
import { useApiSong } from "@/hooks/useApiSong";

interface InitialValues {
  getSongs: () => Promise<void>;
  songs: ISong[];
  songsSearch: ISong[];
  addToFav: (favId: string) => void;
  changeSongBySearch: (q: string) => void;
  rmToFav: (favId: string) => void;
}

const defaultValue: InitialValues = {
  songs: [],
  songsSearch: [],
  addToFav: () => { },
  changeSongBySearch: () => { },
  rmToFav: () => { },
  getSongs: () => ({ } as  Promise<void>),
};

export const SongDinamicContext = React.createContext<InitialValues>(defaultValue);

export const SongDinamicProvider = ({ children }: { children: ReactNode }) => {
  const { fetchListSong } = useApiSong();
  const [songs, setSongs] = useState<ISong[]>([]);
  const [songsSearch, setSongsSearch] = useState<ISong[]>([]);
  const [songFavorites, setSongFavorites] = useState<ISong[]>([]);

  const getSongs = async () => {
    try {
      const songsResp = await fetchListSong()
      const songsFilter = songsResp.data;

      setSongs(songsFilter);
      setSongsSearch(songsFilter);
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
    if (!query.trim()) return setSongsSearch(songs)

    const himnosFiltered = songs.filter((himno) => {
      return (
        removeAccents(himno.title).toLowerCase().includes(removeAccents(query).toLowerCase()) ||
        removeAccents(himno.paragraphs[0].paragraph).toLowerCase().includes(removeAccents(query).toLowerCase())
      );
    });

    setSongsSearch(himnosFiltered);
  };

  // useEffect(() => {
  //   getSongs();
  //   changeSongBySearch('');
  // }, []);

  return (
    <SongDinamicContext.Provider value={{
      songs,
      songsSearch,
      addToFav,
      rmToFav,
      changeSongBySearch,
      getSongs,
    }}>
      {children}
    </SongDinamicContext.Provider>
  );
};
