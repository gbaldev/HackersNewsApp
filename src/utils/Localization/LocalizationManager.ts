import { I18nManager } from 'react-native';
import I18n from 'react-native-i18n';
import * as RNLocalize from 'react-native-localize';
import * as en from './Translations/en.json';

const translationGetters: {[lang: string]: {}} = {
  en: en,
}

export class LocalizationManager {
  static initialSetup() {
    const fallback = { languageTag: 'en', isRTL: false };
    const { languageTag, isRTL } = RNLocalize.findBestLanguageTag(Object.keys(translationGetters)) || fallback;

    I18nManager.forceRTL(isRTL);
    I18n.translations = { [languageTag]: translationGetters[languageTag] };
    I18n.locale = languageTag;
  }

  static strings(name: string) {
    LocalizationManager.initialSetup();
    I18n.fallbacks = false;
    const str = I18n.translate(name);
    return str;
  }

  static stringWithInterpolation(name: string, parameters: I18n.TranslateOptions) {
    LocalizationManager.initialSetup();
    I18n.fallbacks = true;
    return I18n.t(name, parameters);
  }
}
