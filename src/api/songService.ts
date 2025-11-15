import { ID, ISong, ISongCreate } from '@/types/types';
import axiosClient, { axiosClientLocal } from './axiosClient';

export const getListsSong = async () => {
  try {
    // useEffect(() => {
    //   fetch('/jsons/index.json')
    //     .then(res => res.json())
    //     .then(data => {
    //       console.log(data)
    //       // setHimnos(data);
    //       // setLoading(false);
    //     })
    //     .catch(err => {
    //       console.error('Error al cargar índice:', err);
    //       // setLoading(false);
    //     });
    const response = await axiosClientLocal.get<ISong[]>('index.json');
    return response.data;
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
    const {id, ..._songData} = songData;
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