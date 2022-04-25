// import localStorage from '@react-native-async-storage/async-storage';

const keyFav = 'song-favorites'

export const setFavs = (favIds: string[]) => {
    localStorage.setItem(keyFav, JSON.stringify(favIds))
}
export const getFavs =(): string[] => {
    const sFavs = localStorage.getItem(keyFav)
    if (!sFavs) return []
    return JSON.parse(sFavs)
}

export const deleteFav = (id: string) => {
    const favs = getFavs();
    const currFavs = favs.filter(favId => favId!==id)
    setFavs(currFavs)
}

export const findFav = (id: string) => {
    const favs = getFavs();
    const fav = favs.find(favId => favId === id)
    return fav
}

export const addFav = (id: string) => {
    const favs = getFavs();
    const isInFav = findFav(id);
    if (!isInFav) {
        favs.push(id);
        setFavs(favs);
    }
}

class Storage {
    static instance = new Storage()
    store = async (key: string, value: string) => {
        try {
            await localStorage.setItem(key, value);
            return true;
        } catch (e: any) {
            console.error('Storage Error', e);
            return false;
        }
    };

    get = async (key: string) => {
        try {
            return await localStorage.getItem(key);
        } catch (e: any) {
            console.error('Storage get Error', e);
            throw Error(e);
        }
    };

    remove = async (key: string) => {
        try {
            await localStorage.removeItem(key);
            return true;
        } catch (e: any) {
            console.error('Storage remove Error', e);
            return false;
        }
    };

    multiGet = async (keys: any[]): Promise<any> => {
        try {
            return await localStorage.multiGet(keys);
        } catch (e: any) {
            console.error('Storage  multiGet Error', e);
            throw Error(e);
        }
    };

    getAllKeys = async () => {
        try {
            return await localStorage.getAllKeys();
        } catch (e: any) {
            console.error('Storage getAllKeys err', e);
            throw Error(e);
        }
    };
}

export default Storage;