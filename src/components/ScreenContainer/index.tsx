import React, { FC, Fragment, PropsWithChildren } from 'react';
import { SafeAreaView, ViewStyle } from 'react-native';
import styles from './styles';

const ScreenContainer: FC<PropsWithChildren & { style?: ViewStyle, safeAreaViewBackgroundColor?: string }> = ({ children, style, safeAreaViewBackgroundColor }) => {
  return (
    <>
      <SafeAreaView style={{ flex:0, backgroundColor: safeAreaViewBackgroundColor }} />
      <SafeAreaView style={[styles.container, style && style]}>
        {children}
      </SafeAreaView>
    </>
  );
};

export default ScreenContainer;
