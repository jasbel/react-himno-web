import React, { ReactNode, useEffect, useState } from "react";
import {  ISongNew } from "../types/types";
import _songAll from "../assets/data-quechua.json";
import { addFav, deleteFav, findFav } from "../libs/storage";

interface InitialValues {
  songs: ISongNew[];
  songFavorites: ISongNew[];
  addToFav: (favId: string) => void;
  rmToFav: (favId: string) => void;
}

const defaultValue: InitialValues = {
  songs: [],
  songFavorites: [],
  addToFav: () => {},
  rmToFav: () => {},
};

export const SongQuechuaContext = React.createContext<InitialValues>(defaultValue);

export const SongNewQuechuaProvider = ({ children }: { children: ReactNode }) => {
  const [songs, setSongs] = useState([] as ISongNew[]);
  const [songFavorites, setSongFavorites] = useState<ISongNew[]>([]);

  const getSongs = async () => {
    try {
      
      // const favIds = getFavs();
      const favorites = (_songAll as unknown as ISongNew[]).filter((song) => !!findFav(song.id));
      const songsFilter = (_songAll as unknown as ISongNew[]).filter((song) => !findFav(song.id));

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

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <SongQuechuaContext.Provider value={{ songs, songFavorites, addToFav, rmToFav }}>
      {children}
    </SongQuechuaContext.Provider>
  );
};
