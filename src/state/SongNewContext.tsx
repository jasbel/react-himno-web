import React, { ReactNode, useEffect, useState } from "react";
import { ISong } from "../types/types";
import { addFav, deleteFav, findFav } from "../libs/storage";
import { removeAccents } from "@/res/removeAccents";
import { getListSongLocal, getListV1SongLocal } from "@/api/songLocalService";
import { songV1ToNew } from "@/helpers/helper";



interface InitialValues {
  songFavorites: ISong[];
  songAllFilter: ISong[];
  addToFav: (favId: string) => void;
  changeSongBySearch: (q: string) => void;
  rmToFav: (favId: string) => void;
}

const defaultValue: InitialValues = {
  songAllFilter: [],
  songFavorites: [],
  addToFav: () => { },
  changeSongBySearch: () => { },
  rmToFav: () => { },
};

export const SongNewContext = React.createContext<InitialValues>(defaultValue);

export const SongNewProvider = ({ children }: { children: ReactNode }) => {
  const [songAll, setSongAll] = useState<ISong[]>([]);
  const [songAllNoFav, setSongsAllNoFav] = useState<ISong[]>([]);
  const [songAllFilter, setSongAllFilter] = useState<ISong[]>([]);
  const [songFavorites, setSongFavorites] = useState<ISong[]>([]);

  const getSongAll = async (): Promise<ISong[]> => {
    const data = await getListSongLocal()
    const dataV1 = await getListV1SongLocal()
    const _dataV1 = dataV1.map(it => songV1ToNew(it))
    const _data = [  ...data, ..._dataV1]
    setSongAll(_data)
    return _data
  }

  const getSongs = async () => {
    try {
      const songAll = await getSongAll()
      const favorites = (songAll as unknown as ISong[]).filter((song) => !!findFav(song.id));
      const songsFilter = (songAll as unknown as ISong[]).filter((song) => !findFav(song.id));
       setSongAllFilter(songAll)
      setSongsAllNoFav(songsFilter);
      setSongFavorites(favorites);
    } catch (error) {
      console.error("Get Favorites Err", error);
    }
  };

  const addToFav = (id: string) => {
    addFav(id);

    const itemToFav = songAllNoFav.find((song) => song.id === id);
    if (!itemToFav) return;

    const cSongs = songAllNoFav.filter((song) => song.id !== id);
    const cFavs = [...songFavorites, itemToFav];

    setSongsAllNoFav(cSongs);
    setSongFavorites(cFavs);
  };

  const rmToFav = (id: string) => {
    deleteFav(id);
    const itemToSong = songFavorites.find((song) => song.id === id);
    if (!itemToSong) return;

    const cFavs = songFavorites.filter((song) => song.id !== id);
    const cSongs = songAllNoFav.filter((song) => song.id !== id);

    setSongsAllNoFav([...cSongs, itemToSong]);
    setSongFavorites(cFavs);
  };

  const changeSongBySearch = (query: string) => {
    if (!query.trim()) return setSongAllFilter(songAll)

    const himnosFiltered = songAll.filter((himno) => {
      return (
        removeAccents(himno.title).toLowerCase().includes(removeAccents(query).toLowerCase()) ||
        removeAccents(himno.paragraphs[0]?.paragraph).toLowerCase().includes(removeAccents(query).toLowerCase())
      );
    });

    setSongAllFilter(himnosFiltered);
  };

  useEffect(() => {
    getSongs();
    changeSongBySearch('');
  }, []);

  return (
    <SongNewContext.Provider value={{
      songAllFilter: songAllFilter,
      songFavorites,
      addToFav,
      rmToFav,
      changeSongBySearch
    }}>
      {children}
    </SongNewContext.Provider>
  );
};
