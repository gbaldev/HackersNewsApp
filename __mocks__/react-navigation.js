// __mocks__/react-navigation.js

import React from 'react';

const NavigationContainer = ({children}) => {
  return <>{children}</>;
};

const createStackNavigator = jest.fn(() => ({
  Navigator: jest.fn(({children}) => <>{children}</>),
  Screen: jest.fn(),
}));

export {NavigationContainer, createStackNavigator};
