import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/colors";

const ProgressBar = ({ data }) => {
  const { workingDays, daysWorked } = data;
  const percentage = (daysWorked / workingDays) * 100;

  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBar}>
        <LinearGradient
          colors={[Colors.secondary, Colors.primary]}
          start={[0, 0.5]}
          end={[1, 0.5]}
          style={[StyleSheet.absoluteFill, { width: `${percentage}%` }]}
        />
      </View>
      <View style={styles.progressTextContainer}>
        <Text style={styles.progressTextPercentage}>{`${percentage.toFixed(
          0
        )}%`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  progressBar: {
    height: 20,
    width: "85%",
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    overflow: "hidden",
  },
  progressTextContainer: {
    paddingLeft: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
  },
  progressTextPercentage: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default ProgressBar;
