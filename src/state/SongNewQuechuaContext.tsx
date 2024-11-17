import React, { ReactNode, useEffect, useState } from "react";
import { ISongNew, ISongSearch } from "../types/types";
import { addFav, deleteFav, findFav } from "../libs/storage";
import songAll from "../assets/data-quechua.json";
import { removeAccents } from "../res/removeAccents";

const songAllSearch: ISongSearch[] = songAll.map(s => ({
  'id': s.id,
  'code': s.code,
  'title': s.title,
  'musicalNote': s.musicalNote,
  // description: s.paragraphs[0]?.paragraph,
  paragraphs: s.paragraphs,
}))

interface InitialValues {
  songs: ISongNew[];
  songFavorites: ISongNew[];
  songsSearch: ISongSearch[];
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
  const [songs, setSongs] = useState<ISongNew[]>([]);
  const [songsSearch, setSongsSearch] = useState<ISongSearch[]>([]);
  const [songFavorites, setSongFavorites] = useState<ISongNew[]>([]);

  const getSongs = async () => {
    try {

      // const favIds = getFavs();
      const favorites = (songAll as unknown as ISongNew[]).filter((song) => !!findFav(song.id));
      const songsFilter = (songAll as unknown as ISongNew[]).filter((song) => !findFav(song.id));

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
    changeSongBySearch('')
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