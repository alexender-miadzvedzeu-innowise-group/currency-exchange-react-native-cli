import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    console.log(error);
  }
} 

export const getData = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value
  } catch(error) {
    console.log(error);
    return null;
  }
}

export const removeData = async (key: string) => {
  try {
    const value = await AsyncStorage.removeItem(key)
    return value
  } catch(error) {
    console.log(error);
  }
}