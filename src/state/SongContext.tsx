import React, { ReactNode, useEffect, useState } from "react";
import { Songs } from "../types/types";
import { songs as songAll } from "../res/letters";
import Storage from "../libs/storage";


interface InitialValues {
  songs: Songs[];
  songFavorites: Songs[];
}

const defaultValue: InitialValues = {
  songs: [],
  songFavorites: [],
};

export const SongContext = React.createContext(defaultValue);

export const SongProvider = ({ children }: { children: ReactNode }) => {
  const [songs, setSongs] = useState([] as Songs[]);
  const [songFavorites, setSongFavorites] = useState<Songs[]>([]);

  const getSongs = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter((key: string | string[]) =>
        key.includes("favorite-")
      );
      const favs = await Storage.instance.multiGet(keys);
      const cFavorites: Songs[] = favs.map((fav: string[]) => JSON.parse(fav[1]));
    

      const cSongs = songAll.filter((song) => {
        const inFavorite = cFavorites.filter((itemFav) => itemFav.id === song.id);
        return inFavorite?.length ? false : true;
      });

      console.log({cFavorites, cSongs})

      setSongs(cSongs);
      setSongFavorites(cFavorites);
    } catch (error) {
      console.error("Get Favorites Err", error);
    }
  };

  useEffect(() => {
    getSongs()
  }, [])
  

  return <SongContext.Provider value={{ songs, songFavorites }}>{children}</SongContext.Provider>;
};
