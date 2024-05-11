import React, { useMemo, useEffect, useState } from 'react';
import { UserInfoContextType, Provider } from './context';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserInfoProviderProps = {
  children: any
};

export const UserInfoProvider: React.ComponentType<UserInfoProviderProps> = ({
  children,
}) => {
  const [currentHasPushPermission, setCurrentHasPushPermission] = useState<boolean>(false);
  const [currentPreferences, setCurrentPreferences] = useState<{ ios: boolean, android: boolean }>({ ios: true, android: true });

  const setPermission = async (hasPermission: boolean) => {
    await AsyncStorage.setItem('pushPermission', hasPermission ? 'yes' : 'no');
    setCurrentHasPushPermission(hasPermission);
  }

  const setPreferences = async (preferences: { ios: boolean, android: boolean }) => {
    await AsyncStorage.setItem('pushPreferences', JSON.stringify(preferences));
    setCurrentPreferences(preferences);
  }

  useEffect(() => {
    const initialLoading = async () => {
      const pushPermission = await AsyncStorage.getItem('pushPermission');
      const preferences = await AsyncStorage.getItem('pushPreferences');

      if (pushPermission) {
        setPermission(pushPermission === 'yes');
      }

      if (preferences) {
        setPreferences(JSON.parse(preferences));
      }
    }

    initialLoading();
  }, []);  

  const contextValue = useMemo<UserInfoContextType>(
    () => ({
      preferences: currentPreferences,
      hasPushPermission: currentHasPushPermission,
      setPermission,
      setPreferences,
    }),
    [
      currentPreferences,
      currentHasPushPermission,
      setPermission,
      setPreferences,
    ]
  );

  return <Provider value={contextValue}>{children}</Provider>
}

export default UserInfoProvider;
