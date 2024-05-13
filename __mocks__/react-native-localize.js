// __mocks__/react-native-localize.js

export const findBestAvailableLanguage = jest.fn(() => ({
  languageTag: 'en',
  isRTL: false,
}));

export const findBestLanguageTag = jest.fn(() => 'en');

export default {
  findBestLanguageTag,
};

// jest.mock('react-native-localize');