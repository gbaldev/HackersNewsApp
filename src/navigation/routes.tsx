import {NativeStackNavigationProp} from '@react-navigation/native-stack';

enum StackRoutes {
  INITIAL = 'INITIAL',
  HOME = 'HOME',
  WEBVIEW = 'WEBVIEW',
  SETTINGS = 'SETTINGS',
}

export type StackRoutesList = {
  [StackRoutes.INITIAL]: undefined;
  [StackRoutes.HOME]: undefined;
  [StackRoutes.WEBVIEW]: {uri: string; title: string};
  [StackRoutes.SETTINGS]: undefined;
};

export type RootStackNavigationProp<T extends keyof StackRoutesList> =
  NativeStackNavigationProp<StackRoutesList, T>;

export default StackRoutes;
