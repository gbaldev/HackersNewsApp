import { createContext, useContext } from 'react';

export type UserInfoContextType = {
  hasPushPermission: boolean;
  preferences: { ios: boolean, android: boolean };
  setPermission: (hasPermission: boolean) => void;
  setPreferences: (preference: { ios: boolean, android: boolean }) => void;
}

const UserInfoContext = createContext<UserInfoContextType | null>(null);
UserInfoContext.displayName = 'UserInfoContext';

export const Consumer = UserInfoContext.Consumer;
export const Provider = UserInfoContext.Provider;

export const useUserInfo = () => {
  const context = useContext(UserInfoContext);

  if (!context) {
    throw new Error(
      'UserInfoContext must be used within a UserInfoContextProvider.'
    );
  }

  return context;
};
