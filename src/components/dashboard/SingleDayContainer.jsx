import { View, StyleSheet, Text } from "react-native";

import Colors from "../../constants/colors";

const SingleDayContainer = ({ day, isWorkingDay }) => {
  return (
    <View style={styles.singleDayContainer}>
      <Text style={styles.text}>{day}</Text>
      <View
        style={[
          styles.circleContainer,
          isWorkingDay ? styles.circleContainerFilled : null,
        ]}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  singleDayContainer: {
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  circleContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "gray",
    marginVertical: 8,
    marginHorizontal: 12,
  },
  circleContainerFilled: {
    borderWidth: 1.5,
    borderColor: "white",
    backgroundColor: Colors.secondary,
  },
});

export default SingleDayContainer;
