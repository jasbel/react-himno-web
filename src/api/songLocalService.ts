import { ID, ISong, ISongCreate, ISongOld } from '@/types/types';
import axiosClient, { axiosClientLocal } from './axiosClient';

export const getListSongLocal = async (): Promise<ISong[]> => {
  try {
    const fetchData = async () => {
      try {
        const response = await fetch('/data-song.json')
        if (!response.ok) {
          throw new Error('Failed to fetch config')
        }
        const configData: ISong[] = await response.json()
        console.log({ configData });

        return configData
      } catch (err) {
        return []
        // setError(err.message)
      }
    }

    const response = await fetchData();
    return response;
  } catch (error) {
    throw error;
  }
};
export const getListOldSongLocal = async () => {
  try {
    const fetchData = async () => {
      try {
        const response = await fetch('/data_old.json')
        if (!response.ok) {
          throw new Error('Failed to fetch config')
        }
        const configData: ISongOld[] = await response.json()
        console.log({ configData });

        return configData
      } catch (err) {
        return []
        // setError(err.message)
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