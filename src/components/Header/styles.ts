import {StyleSheet} from 'react-native';
import {FontFamily} from '../../assets/fonts';
import colors from '@consts/colors';

export default StyleSheet.create({
  headerContainer: {
    height: 50,
    width: '100%',
    backgroundColor: colors.appBackground,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 5,
    paddingVertical: 7,
  },
  iconContainer: {
    padding: 1,
    backgroundColor: 'white',
    marginRight: 10,
  },
  hackerNewsTitle: {
    fontFamily: FontFamily.OpenSans_Bold,
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
  sectionName: {
    fontFamily: FontFamily.OpenSans_Regular,
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 5,
  },
  innerContainerLeft: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
    flex: 1,
  },
  innerContainerRight: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
  },
  isSelected: {
    fontFamily: FontFamily.OpenSans_Bold,
  },
});
