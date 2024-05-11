import { StyleSheet } from "react-native";
import { FontFamily } from "@assets/fonts";
import colors from "@consts/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  paragraph: {
    fontFamily: FontFamily.NotoSans_Bold,
    textAlign: 'justify',
    padding: 16,
    color: colors.gray,
  },
  buttonLabel: {
    fontFamily: FontFamily.NotoSans_Regular,
    color: colors.gray,
    textAlign: 'center',
    width: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 16,
    backgroundColor: 'blue',
    borderRadius: 5,
    borderColor: 'black',
    margin: 16,
    marginVertical: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  primaryText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  primary: {
    backgroundColor: colors.appBackground,
  },
  secondary: {
    backgroundColor: 'white',
  },
  permissionRequestContiner: {
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    width: '100%',
  },
});