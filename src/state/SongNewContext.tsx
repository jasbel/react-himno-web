import React, { ReactNode, useEffect, useRef, useState } from "react";
import { ID, ISong, ISong2 } from "../types/types";
import { addFav, deleteFav, findFav } from "../libs/storage";
import { rmAccents } from "@/res/removeAccents";
import { getListSongLocal, getListV1SongLocal } from "@/api/songLocalService";
import { songDTOJson } from "@/helpers/helper";



interface InitialValues {
  songAllFilter: ISong[];
  addToFav: (favId: ID) => void;
  changeSongBySearch: (q: string) => void;
  rmToFav: (favId: ID) => void;
}

const defaultValue: InitialValues = {
  songAllFilter: [],
  addToFav: () => { },
  changeSongBySearch: () => { },
  rmToFav: () => { },
};

export const SongNewContext = React.createContext<InitialValues>(defaultValue);

export const SongNewProvider = ({ children }: { children: ReactNode }) => {
  const songAllRef = useRef<ISong2[]>([]);
  const [_songAll, setSongAll] = useState<ISong2[]>([]);
  const [songAllFilter, setSongAllFilter] = useState<ISong2[]>([]);


  const getSongAll = async (): Promise<ISong2[]> => {
    const data = await getListSongLocal()
    const dataLocal = await getListV1SongLocal()
    const dataResponse = [...data, ...dataLocal.map(it => songDTOJson(it))]

    songAllRef.current = dataResponse
    
    setSongAll(dataResponse)

    return dataResponse
  }

  const getSongs = async () => {
    try {
      const songAll = await getSongAll()
      songAllRef.current = songAll.map(it => ({ ...it, favorite: !!findFav(it.id) }))
      setSongAllFilter(_songsOrdered());
    } catch (error) {
      console.error("Get Favorites Err", error);
    }
  };

  const _songsOrdered = (): ISong2[] => {
    return songAllRef.current.sort((a, b) => {
      if (a.favorite === b.favorite) return 0;
      return a.favorite ? -1 : 1;
    })
  }

  const setSongs = () => {
    setSongAllFilter(_songsOrdered())
  }
  const addToFav = (id: ID) => {
    addFav(id);
    songAllRef.current = songAllRef.current.map(it => it.id === id ? ({ ...it, favorite: true }) : it)
    setSongs()
  };

  const rmToFav = (id: ID) => {
    deleteFav(id);
    songAllRef.current = songAllRef.current.map(it => it.id === id ? ({ ...it, favorite: false }) : it)
    setSongs()
  };

  const changeSongBySearch = (query: string) => {
    if (!query.trim()) return setSongAllFilter(_songAll)

    const himnosFiltered = _songAll.filter((it) => {
      return (
        rmAccents(it.title).toLowerCase().includes(rmAccents(query).toLowerCase()) ||
        rmAccents(it.paragraphs[0]?.paragraph).toLowerCase().includes(rmAccents(query).toLowerCase())
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
      songAllFilter,
      addToFav,
      rmToFav,
      changeSongBySearch
    }}>
      {children}
    </SongNewContext.Provider>
  );
};
