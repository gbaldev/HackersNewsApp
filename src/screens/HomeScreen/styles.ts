import {StyleSheet} from 'react-native';
import {FontFamily} from '@assets/fonts';
import colors from '@consts/colors';

export default StyleSheet.create({
  screenContainer: {
    justifyContent: 'space-between',
    padding: undefined,
  },
  separator: {
    height: 10,
  },
  flatList: {
    width: '100%',
  },
  settingsIconContainer: {
    position: 'absolute',
    bottom: 50,
    right: 25,
    backgroundColor: colors.appBackground,
    padding: 8,
    borderRadius: 50,
  },
  emptyDataContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyDataText: {
    paddingHorizontal: 16,
    textAlign: 'center',
    fontFamily: FontFamily.NotoSans_Regular,
  },
});
