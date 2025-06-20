import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = 'FlickrCachedImages';

export const loadCachedImages = async () => {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('Cache load error:', e);
    return null;
  }
};

export const saveImagesToCache = async (images: any[]) => {
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(images));
  } catch (e) {
    console.warn('Cache save error:', e);
  }
};
