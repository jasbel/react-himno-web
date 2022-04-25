import React, { ReactNode, useEffect, useState } from "react";
import { Songs } from "../types/types";
import { songs as songAll } from "../res/letters";
import { addFav, deleteFav, findFav } from "../libs/storage";

interface InitialValues {
  songs: Songs[];
  songFavorites: Songs[];
  addToFav: (favId: string) => void;
  rmToFav: (favId: string) => void;
}

const defaultValue: InitialValues = {
  songs: [],
  songFavorites: [],
  addToFav: () => {},
  rmToFav: () => {},
};

export const SongContext = React.createContext<InitialValues>(defaultValue);

export const SongProvider = ({ children }: { children: ReactNode }) => {
  const [songs, setSongs] = useState([] as Songs[]);
  const [songFavorites, setSongFavorites] = useState<Songs[]>([]);

  const getSongs = async () => {
    try {
      // const favIds = getFavs();
      const favorites = songAll.filter((song) => !!findFav(song.id));
      const songsFilter = songAll.filter((song) => !findFav(song.id));

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
    <SongContext.Provider value={{ songs, songFavorites, addToFav, rmToFav }}>
      {children}
    </SongContext.Provider>
  );
};
