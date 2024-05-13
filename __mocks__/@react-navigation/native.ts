// __mocks__/@react-navigation/native.ts

import React from 'react';

// Mock de useNavigation
export const useNavigation = jest.fn(() => ({
  navigate: jest.fn(),
}));
