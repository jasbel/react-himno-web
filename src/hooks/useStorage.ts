import React from 'react'

const useStorage = () => {
    const store = async (key: string, value: string) => {
        try {
            await localStorage.setItem(key, value);
            return true;
        } catch (e: any) {
            console.error('Storage Error', e);
            return false;
        }
    };

    const get = async (key: string) => {
        try {
            return await localStorage.getItem(key);
        } catch (e: any) {
            console.error('Storage get Error', e);
            throw Error(e);
        }
    };

    const remove = async (key: string) => {
        try {
            await localStorage.removeItem(key);
            return true;
        } catch (e: any) {
            console.error('Storage remove Error', e);
            return false;
        }
    };
  return {setItem: store, getItem: get, removeItem: remove}
}

export default useStorage;