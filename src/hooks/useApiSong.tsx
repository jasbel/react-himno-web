import { useState, useEffect } from 'react';
import { getSong, getListSong, createSong, updateSong, deleteSong } from '../api/songService';
import { ID, ISong, ISongCreate } from '@/types/types';

export const useApiSong = () => {
  const fetchOneSong = async (id: ID) => {
    let resp = { data: {} as ISong, error: '', ok: false }
    try {
      const data = await getSong(id);
      resp['data'] = data;
      resp['ok'] = true;
    } catch (err) {
      resp['error'] = JSON.stringify(err)
    } finally {
      return resp;
    }
  };
  const fetchListSong = async () => {
    let resp = { data: [] as ISong[], error: '', ok: false }
    try {
      const data = await getListSong();
      resp['data'] = data;
      resp['ok'] = true;
    } catch (err) {
      resp['error'] = JSON.stringify(err)
    } finally {
      return resp;
    }
  };
  const fetchCreateSong = async (dataCreate: ISongCreate) => {
    let resp = { data: {} as ISongCreate, error: '', ok: false }
    try {
      const data = await createSong(dataCreate);
      resp['data'] = data;
      resp['ok'] = true;
    } catch (err) {
      resp['error'] = JSON.stringify(err)
    } finally {
      return resp;
    }
  };
  const fetchUpdateSong = async (dataUpdate: ISong) => {
    let resp = { data: {} as ISong, error: '', ok: false }
    try {
      const data = await updateSong(dataUpdate);
      resp['data'] = data;
      resp['ok'] = true;
    } catch (err) {
      resp['error'] = JSON.stringify(err)
    } finally {
      return resp;
    }
  };
  const fetchDeleteSong = async (id: ID) => {
    let resp = { data: {} as ISong, error: '', ok: false }
    try {
      const data = await deleteSong(id);
      resp['data'] = data;
      resp['ok'] = true;
    } catch (err) {
      resp['error'] = JSON.stringify(err)
    } finally {
      return resp;
    }
  };
  return {
    fetchOneSong,
    fetchListSong,
    fetchCreateSong,
    fetchUpdateSong,
    fetchDeleteSong,
  };
};
