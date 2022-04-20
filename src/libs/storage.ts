// import localStorage from '@react-native-async-storage/async-storage';

class Storage {
    static instance = new Storage()
    store = async (key: string, value: string) => {
        try {
            await localStorage.setItem(key, value);
            return true;
        } catch (e: any) {
            console.log('Storage Error', e);
            return false;
        }
    };

    get = async (key: string) => {
        try {
            return await localStorage.getItem(key);
        } catch (e: any) {
            console.log('Storage get Error', e);
            throw Error(e);
        }
    };

    remove = async (key: string) => {
        try {
            await localStorage.removeItem(key);
            return true;
        } catch (e: any) {
            console.log('Storage remove Error', e);
            return false;
        }
    };

    multiGet = async (keys: any[]): Promise<any> => {
        try {
            return await localStorage.multiGet(keys);
        } catch (e: any) {
            console.log('Storage  multiGet Error', e);
            throw Error(e);
        }
    };

    getAllKeys = async () => {
        try {
            return await localStorage.getAllKeys();
        } catch (e: any) {
            console.log('Storage getAllKeys err', e);
            throw Error(e);
        }
    };
}

export default Storage;