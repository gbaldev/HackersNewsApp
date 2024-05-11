import React, { useCallback, useEffect, useState } from 'react';
import { AppState, AppStateStatus, Linking, Platform, Text, TouchableOpacity, View } from 'react-native';
import ScreenContainer from '@components/ScreenContainer';
import colors from '@consts/colors';
import { LocalizationManager as i } from '@utils/Localization/LocalizationManager';
import styles from './styles';
import { initialNotificationsConfig } from '@notification/PushNotificationService';
import { Notifications } from 'react-native-notifications';
import { check, PERMISSIONS } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';

const isIOS =Platform.OS === 'ios';

type SettingsScreenProps = {
  preferences: { ios: boolean, android: boolean };
  setPermission: (hasPermission: boolean) => void;
  setPreferences: (preferences: { ios: boolean, android: boolean }) => void;
  hasPushPermission: boolean;
};

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ preferences, setPermission, setPreferences, hasPushPermission }) => {
  const [permissionEnabled, setPermissionEnabled] = useState(hasPushPermission);
  const navigation = useNavigation();

  const updatePermissions = useCallback((isEnabled: boolean) => {
    setPermission(isEnabled);
    setPermissionEnabled(isEnabled);
  }, [hasPushPermission]);
  const [iosInterest, setIosInteres] = useState(preferences.ios);
  const toggleIOS = useCallback(() => {
    setPreferences({
      ios: !preferences.ios,
      android: preferences.android,
    })
    setIosInteres(!preferences.ios)
  }, [preferences]);
  const [androidInterest, setAndroidInterest] = useState(preferences.android);
  const toggleAndroid = useCallback(() => {
    setPreferences({
      ios: preferences.ios,
      android: !preferences.android,
    })
    setAndroidInterest(!preferences.android);
  }, [preferences]);

  const openAppSettings = async () => {
    initialNotificationsConfig(navigation);
  };

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      console.log('Changed:', nextAppState);

      if (nextAppState === 'active') {
        if (isIOS) {
          const { alert } = await Notifications.ios.checkPermissions();
          updatePermissions(alert);
        } else {
          const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
          updatePermissions(result === 'granted');
        }
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <ScreenContainer style={styles.screenContainer} safeAreaViewBackgroundColor={colors.appBackground}>
      <View>
        <View style={styles.sectionContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{i.strings('settingsScreen.pushNotifications')}</Text>
            <TouchableOpacity
              onPress={openAppSettings}
              style={[
                styles.toggle,
                {
                  backgroundColor: permissionEnabled ? colors.appBackground : colors.gray,
                  alignItems: permissionEnabled ? 'flex-end' : 'flex-start',
                },
              ]}>
              <View style={styles.toggleDot}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionDescription}>{i.strings('settingsScreen.pushNotificationsDerscription')}</Text>
        </View>
        {permissionEnabled && <View style={styles.sectionContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{i.strings('settingsScreen.preferences')}</Text>
          </View>
            <View style={styles.preferenceContainer}>
              <TouchableOpacity
                onPress={toggleIOS}
                style={[
                  styles.check,
                  {
                    backgroundColor: iosInterest ? colors.gray : colors.white,
                    borderColor: iosInterest ? colors.appBackground : colors.gray,
                  }
                ]}
                />
              <Text style={styles.preference}>{i.strings('settingsScreen.ios')}</Text>
            </View>
            <View style={styles.preferenceContainer}>
              <TouchableOpacity
                onPress={toggleAndroid}
                style={[
                  styles.check,
                  {
                    backgroundColor: androidInterest ? colors.gray : colors.white,
                    borderColor: androidInterest ? colors.appBackground : colors.gray,
                  },
                ]}
              />
              <Text style={styles.preference}>{i.strings('settingsScreen.android')}</Text>
            </View>
          <Text style={styles.sectionDescription}>{i.strings('settingsScreen.preferencesDescription')}</Text>
        </View>}
      </View>
    </ScreenContainer>
  );
};

export default SettingsScreen;
