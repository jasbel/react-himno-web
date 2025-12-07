import { ID, ISong, ISong2, ISongCreate, ISongItem, ISongListV1, ISongV1 } from '@/types/types';
import axiosClient, { axiosClientLocal } from './axiosClient';

export const getListSongLocal = async (): Promise<ISong2[]> => {
  try {
    const fetchData = async () => {
      try {
        const response = await fetch('/data-song.json')
        if (!response.ok) {
          throw new Error('Failed to fetch config')
        }
        const configData: ISong[] = await response.json()

        return configData
      } catch (err) {
        return []
        // setError(err.message)
      }
    }

    const _response = await fetchData();
    const response: ISong2[] = _response.map(it => ({...it, favorite: false}));
    return response;
  } catch (error) {
    throw error;
  }
};
export const getSongV1Item = async (fn: string):  Promise<ISongItem> => {
  try {
    console.log({fn})
        const response = await fetch(`/songs_v1/${fn}`)
        if (!response.ok) {
          throw new Error('Failed to fetch config')
        }
        const configData: ISongItem = await response.json()
        console.log({ configData });

        return configData
      
    
  } catch (error) {
    throw error;
  }
};
export const getListV1SongLocal = async ():  Promise<ISongListV1[]> => {
  try {
    const fetchData = async () => {
      try {
        const response = await fetch('/songs_v1/index.json')
        if (!response.ok) {
          throw new Error('Failed to fetch config')
        }
        const configData: ISongListV1[] = await response.json()
        console.log({ configData });

        return configData
      } catch (err: any) {
        console.error(err?.message)
        return []
      }
    }

    const response = await fetchData();
    return response;
  } catch (error) {
    throw error;
  }
};

export const getListSongQuechuaLocal = async ():  Promise<ISongV1[]> => {
  try {
    const fetchData = async () => {
      try {
        const response = await fetch('/songs_quechua/data-quechua.json')
        if (!response.ok) {
          throw new Error('Failed to fetch config')
        }
        const configData: ISongV1[] = await response.json()
        console.log({ configData });

        return configData
      } catch (err: any) {
        console.error(err?.message)
        return []
      }
    }

    const response = await fetchData();
    return response;
  } catch (error) {
    throw error;
  }
};

export const getListSong = async () => {
  try {
    const response = await axiosClient.get<ISong[]>('/songs');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSong = async (id: ID) => {
  try {
    const response = await axiosClient.get<ISong>(`/songs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSong = async (songData: ISongCreate) => {
  try {
    const response = await axiosClient.post<ISong>('/songs', songData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSong = async (songData: ISong) => {
  try {
    const { id, ..._songData } = songData;
    const response = await axiosClient.put<ISong>(`/songs/${id}`, _songData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSong = async (id: ID) => {
  try {
    const response = await axiosClient.delete(`/songs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};