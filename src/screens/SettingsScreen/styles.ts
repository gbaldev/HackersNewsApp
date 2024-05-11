import {StyleSheet} from 'react-native';
import {FontFamily} from '@assets/fonts';
import colors from '@consts/colors';

export default StyleSheet.create({
  screenContainer: {
    justifyContent: 'space-between',
    padding: undefined,
  },
  sectionContainer: {
    marginBottom: 16,
    marginTop: 4,
    padding: 16,
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: FontFamily.NotoSans_Bold,
    fontSize: 16,
    color: colors.gray,
  },
  toggle: {
    height: 30,
    width: 53,
    borderColor: colors.transparent,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  toggleDot: {
    height: 22,
    width: 22,
    backgroundColor: colors.softWhite,
    borderRadius: 50,
  },
  sectionDescription: {
    fontFamily: FontFamily.NotoSans_Regular,
    fontSize: 14,
    color: colors.gray,
    marginTop: 16,
  },
  preferenceContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  preference: {
    fontFamily: FontFamily.NotoSans_Regular,
    fontSize: 14,
    color: colors.gray,
  },
  check: {
    height: 23,
    width: 23,
    borderRadius: 3,
    borderWidth: 4,
    marginRight: 5,
  },
});
