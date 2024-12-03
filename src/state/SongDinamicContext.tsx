import React, { ReactNode, useEffect, useState } from "react";
import { ID, ISong } from "../types/types";
import { addFav, deleteFav } from "../libs/storage";
import { removeAccents } from "@/res/removeAccents";
import { useApiSong } from "@/hooks/useApiSong";
import { initSong } from "@/res/constant";

interface InitialValues {
  getSong: (id: ID) => Promise<ISong>;
  getSongs: () => Promise<void>;
  song: ISong;
  songs: ISong[];
  songsSearch: ISong[];
  addToFav: (favId: string) => void;
  changeSongBySearch: (q: string) => void;
  rmToFav: (favId: string) => void;
}

const defaultValue: InitialValues = {
  song: initSong(),
  songs: [],
  songsSearch: [],
  addToFav: () => { },
  changeSongBySearch: () => { },
  rmToFav: () => { },
  getSong: () => ({ } as  Promise<ISong>),
  getSongs: () => ({ } as  Promise<void>),
};

export const SongDinamicContext = React.createContext<InitialValues>(defaultValue);

export const SongDinamicProvider = ({ children }: { children: ReactNode }) => {
  const { fetchListSong, fetchOneSong, fetchUpdateSong } = useApiSong();
  const [songs, setSongs] = useState<ISong[]>([]);
  const [song, setSong] = useState<ISong>(initSong);
  const [songsSearch, setSongsSearch] = useState<ISong[]>([]);
  const [songFavorites, setSongFavorites] = useState<ISong[]>([]);

  const getSong = async (id: ID) => {
    let dataItem = initSong();
    try {
      const resp = await fetchOneSong(id)
      const item = resp.data;

      setSong(item);
      dataItem = item;
    } catch (error) {
      console.error("Get Favorites Err", error);
    } finally {
      return dataItem;
    }
  };
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
      song,
      songs,
      songsSearch,
      addToFav,
      rmToFav,
      changeSongBySearch,
      getSong,
      getSongs,
    }}>
      {children}
    </SongDinamicContext.Provider>
  );
};
