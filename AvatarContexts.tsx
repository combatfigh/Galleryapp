import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AvatarContext = createContext<any>(null);

export const useAvatar = () => useContext(AvatarContext);

export const AvatarProvider = ({ children }: { children: React.ReactNode }) => {
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('avatar').then(setAvatar);
  }, []);

  const updateAvatar = async (uri: string) => {
    setAvatar(uri);
    await AsyncStorage.setItem('avatar', uri);
  };

  return (
    <AvatarContext.Provider value={{ avatar, updateAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};
