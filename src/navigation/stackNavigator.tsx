import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Routes, { StackRoutesList } from './routes';
import HomeScreenContainer from '../containers/HomeScreen';
import WebViewScreen from '@screens/WebViewScreen';
import InitialScreen from '@screens/InitialScreen';
import Icon from '@components/Icon';
import { FontFamily } from '@assets/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '@consts/colors';
import SettingsScreenContainer from '@containers/SettingsScreen';

const Stack = createNativeStackNavigator<StackRoutesList>();

interface StackNavigatorProps {}

const StackNavigator: React.ComponentType<StackNavigatorProps> = () => {
  const [firstLaunch, setFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const init = async () => {
      const isFirstLaunch = await AsyncStorage.getItem('firstLaunch');
      setFirstLaunch(!isFirstLaunch);
    };
    init();
  }, []);

  if (firstLaunch === null) {
    return <></>;
  }

  return (
    <NavigationContainer>
        <Stack.Navigator>
          {firstLaunch && <Stack.Screen
            name={Routes.INITIAL}
            component={InitialScreen}
            options={{ headerShown: false }}
          />}
          <Stack.Screen
            name={Routes.HOME}
            component={HomeScreenContainer}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name={Routes.WEBVIEW}
            component={WebViewScreen}
            options={({ route }) => ({
              headerShown: true,
              headerStyle: { backgroundColor: colors.appBackground },
              headerTintColor: colors.white,
              headerTitle: '',
              headerLeft: () => <CustomBackButton title={route.params.title} />,
            })}
          />
          <Stack.Screen
            name={Routes.SETTINGS}
            component={SettingsScreenContainer}
            options={() => ({
              headerShown: true,
              headerStyle: { backgroundColor: colors.appBackground },
              headerTintColor: colors.white,
              headerTitle: '',
              headerLeft: () => <CustomBackButton title='Settings' />,
            })}
          />
        </Stack.Navigator>
    </NavigationContainer>
    );
};

const CustomBackButton = ({ title }: { title: string }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.goBack()}
    >
      <Icon name='arrowBack' color={colors.white} />
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  backButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  title: {
    fontFamily: FontFamily.OpenSans_Bold,
    color: 'white',
    textAlign: 'left',
    fontSize: 14,
    flexShrink: 1,
    paddingLeft: 16,
    paddingRight: 40,
    width: '100%',
  },
});

export default StackNavigator;
