import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import ScreenContainer from '@components/ScreenContainer';
import colors from '@consts/colors';
import {RouteProp, useRoute} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import styles from './styles';
import StackRoutes, {StackRoutesList} from '@navigation/routes';

type WebViewScreenProps = {};

const WebViewScreen: React.FC<WebViewScreenProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {params: uri} =
    useRoute<RouteProp<StackRoutesList, StackRoutes.WEBVIEW>>();

  const handleError = () => {
    setIsLoading(false);
  };

  return (
    <ScreenContainer
      style={styles.container}
      safeAreaViewBackgroundColor={colors.appBackground}>
      <WebView
        onLoad={() => {
          setIsLoading(false);
        }}
        source={uri}
        onError={handleError}
      />
      {isLoading && (
        <ActivityIndicator style={styles.activityIndicator} size="large" />
      )}
    </ScreenContainer>
  );
};

export default WebViewScreen;
