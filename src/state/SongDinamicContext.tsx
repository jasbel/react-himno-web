import React, { ReactNode, useState } from "react";
import { ID, ISongModel } from "../types/types";
import { addFav, deleteFav } from "../lib/storage";
import { rmAccents } from "@/utils/removeAccents";
import { useApiSong } from "@/hooks/useApiSong";
import { initSong } from "@/utils/constant";

interface InitialValues {
  getSong: (id: ID) => Promise<ISongModel>;
  getSongs: () => Promise<void>;
  song: ISongModel;
  songs: ISongModel[];
  songsSearch: ISongModel[];
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
  getSong: () => ({ } as  Promise<ISongModel>),
  getSongs: () => ({ } as  Promise<void>),
};

export const SongDinamicContext = React.createContext<InitialValues>(defaultValue);

export const SongDinamicProvider = ({ children }: { children: ReactNode }) => {
  const { fetchListSong, fetchOneSong } = useApiSong();
  const [songs, setSongs] = useState<ISongModel[]>([]);
  const [song, setSong] = useState<ISongModel>(initSong);
  const [songsSearch, setSongsSearch] = useState<ISongModel[]>([]);
  const [songFavorites, setSongFavorites] = useState<ISongModel[]>([]);

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

  const addToFav = (id: ID) => {
    addFav(id);

    const itemToFav = songs.find((song) => song.id === id);
    if (!itemToFav) return;

    const cSongs = songs.filter((song) => song.id !== id);
    const cFavs = [...songFavorites, itemToFav];

    setSongs(cSongs);
    setSongFavorites(cFavs);
  };

  const rmToFav = (id: ID) => {
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
        rmAccents(himno.title).toLowerCase().includes(rmAccents(query).toLowerCase()) ||
        rmAccents(himno.paragraphs[0]?.paragraph).toLowerCase().includes(rmAccents(query).toLowerCase())
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
