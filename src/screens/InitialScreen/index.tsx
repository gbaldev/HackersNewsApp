import React, { useEffect, useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import ScreenContainer from '@components/ScreenContainer';
import Header from '@components/Header';
import StackRoutes, { RootStackNavigationProp } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { finishRegistration, initialNotificationsConfig } from '@notification/PushNotificationService';
import { Notifications } from 'react-native-notifications';
import { LocalizationManager as i } from '@utils/Localization/LocalizationManager';
import colors from '@consts/colors';
import { useUserInfo } from '@contexts/UserInfo/context';
import styles from './styles';
import { PERMISSIONS, check, request } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
const isIOS = Platform.OS === 'ios';

type InitialScreenProps = {};

const InitialScreen: React.FC<InitialScreenProps> = () => {
  const [permissionRequested, setPermissionRequested] = useState<boolean>(false);
  const navigation = useNavigation<RootStackNavigationProp<StackRoutes>>();
  const { setPermission } = useUserInfo();

  const onDecline = async () => {
    await AsyncStorage.setItem('firstLaunch', 'declined');
    navigation.navigate(StackRoutes.HOME);
  };
  
  useEffect(() => {
    if (!permissionRequested) return;
    
    let makeCheck = async () => {
      if (isIOS) {
        const { alert } = await Notifications.ios.checkPermissions();
        
        if (alert) {
          await AsyncStorage.setItem('firstLaunch', 'done');
          finishRegistration(navigation);
          clearInterval(timerId);
          setPermission(true);
          navigation.navigate(StackRoutes.HOME);
        }
      } else {
        const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        if (result === 'granted') {
          await AsyncStorage.setItem('firstLaunch', 'done');
          finishRegistration(navigation);
          clearInterval(timerId);
          setPermission(true);
          navigation.navigate(StackRoutes.HOME);
        }
      }
    };
    
    const timerId = setInterval(async () => {
      await makeCheck();
    }, 500);

    return () => clearInterval(timerId);   

  }, [permissionRequested]);
  
  const requestPermission = () => {
    initialNotificationsConfig();
    setPermissionRequested(true);
  }

  return (
    <ScreenContainer style={styles.container} safeAreaViewBackgroundColor={colors.appBackground}>
      <View style={styles.permissionRequestContiner}>
        <Header />
        <Text style={styles.paragraph}>{i.strings('initialScreen.firstLine')}</Text>
        <Text style={styles.paragraph}>{i.strings('initialScreen.secondLine')}</Text>
        <Text style={styles.paragraph}>{i.strings('initialScreen.thirdLine')}</Text>
        <Text style={styles.paragraph}>{i.strings('initialScreen.fourthLine')}</Text>
        <Text style={styles.paragraph}>{i.strings('initialScreen.fifthLine')}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={onDecline} style={[styles.button, styles.secondary]}>
          <Text style={styles.buttonLabel}>
            {i.strings('initialScreen.buttons.secondary')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={requestPermission} style={[styles.button, styles.primary]}>
          <Text style={[styles.buttonLabel, styles.primaryText]}>
          {i.strings('initialScreen.buttons.primary')}
          </Text>
        </TouchableOpacity>

      </View>
    </ScreenContainer>
  );
}

export default InitialScreen;
