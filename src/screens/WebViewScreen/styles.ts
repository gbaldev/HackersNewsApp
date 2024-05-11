import { Dimensions, StyleSheet } from "react-native";
const { height, width } = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: undefined,
    alignContent: undefined,
    alignItems: undefined,
    padding: undefined,
  },
  activityIndicator: {
    position: "absolute",
    top: (height / 2) - 56,
    left: (width / 2) - 16,
  },
});