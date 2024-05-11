import {StyleSheet} from 'react-native';
import colors from '@consts/colors';
import {FontFamily} from '@assets/fonts';

export default StyleSheet.create({
  container: {
    marginHorizontal: 16,
    borderRadius: 10,
  },
  cardContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: colors.black015,
  },
  innerCard: {
    marginVertical: 10,
    padding: 5,
    flex: 1,
    borderLeftWidth: 2,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titleText: {
    marginLeft: 10,
    maxWidth: '90%',
    fontFamily: FontFamily.OpenSans_Bold,
    fontSize: 16,
    color: 'rgba(0,0,0, 0.6)',
  },
  createdAtLabel: {
    marginLeft: 10,
    fontFamily: FontFamily.OpenSans_SemiBold,
    fontSize: 14,
    color: 'gray',
  },
  iconContainer: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: '100%',
    backgroundColor: colors.darkerRed,
    borderRadius: 10,
  },
  iconInnerContainer: {
    position: 'absolute',
    height: '100%',
    right: 40,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
