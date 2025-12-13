import { ID, ISongModel, ISongCreate } from '@/types/types';
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
    const response = await axiosClientLocal.get<ISongModel[]>('index.json');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getListSong = async () => {
  try {
    const response = await axiosClient.get<ISongModel[]>('/songs');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSong = async (id: ID) => {
  try {
    const response = await axiosClient.get<ISongModel>(`/songs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSong = async (songData: ISongCreate) => {
  try {
    const response = await axiosClient.post<ISongModel>('/songs', songData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSong = async (songData: ISongModel) => {
  try {
    const {id, ..._songData} = songData;
    const response = await axiosClient.put<ISongModel>(`/songs/${id}`, _songData);
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