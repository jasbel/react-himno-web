import React, { ReactNode, useEffect, useRef, useState } from "react";
import { ID, ISong } from "../types/types";
import { addFav, deleteFav, findFav } from "../lib/storage";
import { rmAccents } from "@/utils/removeAccents";
import { getListSongQuechuaLocal } from "@/api/songLocalService";
import { songDTOQchJson } from "@/utils/helper";

interface InitialValues {
  songAllFilter: ISong[];
  addToFav: (favId: ID) => void;
  changeSongBySearch: (q: string) => void;
  rmToFav: (favId: ID) => void;
}

const defaultValue: InitialValues = {
  songAllFilter: [],
  addToFav: () => {},
  changeSongBySearch: () => {},
  rmToFav: () => {},
};

export const SongQchContext = React.createContext<InitialValues>(defaultValue);

export const SongQchProvider = ({ children }: { children: ReactNode }) => {
  const songAllRef = useRef<ISong[]>([]);
  const [songAllFilter, setSongAllFilter] = useState<ISong[]>([]);

  const fetchData = async () => {
    try {
      const dataSongs = await getListSongQuechuaLocal();

      songAllRef.current = dataSongs.map((it) => songDTOQchJson(it));
      return songAllRef.current;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const getSongs = async () => {
    try {
      await fetchData();
      songAllRef.current = songAllRef.current.map((it) => ({
        ...it,
        favorite: !!findFav(it.id),
      }));
      setSongs();
    } catch (error) {
      console.error("Get Favorites Err", error);
    }
  };

  const _songsOrdered = (): ISong[] => {
    return songAllRef.current.sort((a, b) => {
      if (a.favorite === b.favorite) return 0;
      return a.favorite ? -1 : 1;
    });
  };

  const setSongs = () => {
    setSongAllFilter(_songsOrdered());
  };

  const addToFav = (id: ID) => {
    addFav(id);
    songAllRef.current = songAllRef.current.map((it) =>
      it.id === id ? { ...it, favorite: true } : it,
    );
    setSongs();
  };

  const rmToFav = (id: ID) => {
    deleteFav(id);
    songAllRef.current = songAllRef.current.map((it) =>
      it.id === id ? { ...it, favorite: false } : it,
    );
    setSongs();
  };

  const changeSongBySearch = (query: string) => {
    if (!query.trim()) return setSongAllFilter(_songsOrdered());

    const himnosFiltered = _songsOrdered().filter((it) => {
      return (
        rmAccents(it.title)
          .toLowerCase()
          .includes(rmAccents(query).toLowerCase()) ||
        rmAccents(it.paragraphs[0]?.paragraph)
          .toLowerCase()
          .includes(rmAccents(query).toLowerCase())
      );
    });

    setSongAllFilter(himnosFiltered);
  };

  useEffect(() => {
    getSongs();
    changeSongBySearch("");
  }, []);

  return (
    <SongQchContext.Provider
      value={{
        songAllFilter,
        addToFav,
        rmToFav,
        changeSongBySearch,
      }}
    >
      {children}
    </SongQchContext.Provider>
  );
};
