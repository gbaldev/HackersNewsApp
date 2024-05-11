import { LocalizationManager } from './LocalizationManager'

export default class LocalizedStrings {
  static email = LocalizationManager.strings('login.email')
  static password = LocalizationManager.strings('login.password')
  static login = LocalizationManager.strings('login.login')
  static welcome = LocalizationManager.strings('home.welcome')
}
