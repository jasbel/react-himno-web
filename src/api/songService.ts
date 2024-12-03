import { ID, ISong, ISongCreate } from '@/types/types';
import axiosClient from './axiosClient';

export const getListSong = async () => {
  try {
    debugger
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