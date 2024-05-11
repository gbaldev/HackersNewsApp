import React, { useState } from 'react';
import { ActivityIndicator, NativeSyntheticEvent, Text } from 'react-native';
import ScreenContainer from '@components/ScreenContainer';
import colors from '@consts/colors';
import { RouteProp, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import styles from './styles';
import StackRoutes, { StackRoutesList } from '@navigation/routes';
import { WebViewErrorEvent } from 'react-native-webview/lib/RNCWebViewNativeComponent';
import { WebViewError } from 'react-native-webview/lib/WebViewTypes';

type WebViewScreenProps = {};

const WebViewScreen: React.FC<WebViewScreenProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | WebViewErrorEvent>(null);
  const { params: uri } = useRoute<RouteProp<StackRoutesList, StackRoutes.WEBVIEW>>();

  const handleError = (error: NativeSyntheticEvent<WebViewError>) => {
    setError(error.nativeEvent);
  };

  return (
    <ScreenContainer style={styles.container} safeAreaViewBackgroundColor={colors.appBackground}>
      <WebView
        onLoad={() => {
          setIsLoading(false);
          setError(null);
        }}
        source={uri}
        onError={handleError}
      />
      {isLoading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
        />
      )}
      {!isLoading && error && (
        <Text style={styles.activityIndicator}>Error: {error.description}</Text>
      )}
    </ScreenContainer>
  );
};

export default WebViewScreen;
