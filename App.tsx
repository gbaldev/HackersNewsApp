import React, { useEffect } from 'react';
import StackNavigator from './src/navigation/stackNavigator';
import ArticlesProvider from './src/contexts/Articles/provider';
import { initBackgroundFetching } from '@notification/PushNotificationService';
import { Platform } from 'react-native';
import { Notifications } from 'react-native-notifications';
import { check, PERMISSIONS } from 'react-native-permissions';
import UserInfoProvider from '@contexts/UserInfo/provider';
const isIOS = Platform.OS === 'ios';

const App = () => {
  useEffect(() => {
    const initFetching = async () => {
      if (isIOS) {
        const { alert } = await Notifications.ios.checkPermissions();
        if (alert) {
          initBackgroundFetching();
        }
      } else {
        const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        if (result === 'granted' || result === 'limited') {
          initBackgroundFetching();
        }
      }
    }

    initFetching();
  }, []);

  return (
    <>
      <UserInfoProvider>
        <ArticlesProvider>
            <StackNavigator />
        </ArticlesProvider>
      </UserInfoProvider>
    </>
  );
}
export default App;