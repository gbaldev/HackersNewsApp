import React from 'react';
import {SettingsScreen as SettingsScreenUI} from '@screens/SettingsScreen';
import {useUserInfo} from '@contexts/UserInfo/context';

export interface SettingsScreenContainerProps {}

export const SettingsScreenContainer: React.FC<
  SettingsScreenContainerProps
> = () => {
  const {preferences, setPermission, setPreferences, hasPushPermission} =
    useUserInfo();

  return (
    <SettingsScreenUI
      preferences={preferences}
      setPermission={setPermission}
      setPreferences={setPreferences}
      hasPushPermission={hasPushPermission}
    />
  );
};

export default SettingsScreenContainer;
