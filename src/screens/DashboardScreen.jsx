import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../constants/colors";
import Clock from "../components/dashboard/Clock";
import ScheduleCard from "../components/dashboard/ScheduleCard";
import ThisPeriodCard from "../components/dashboard/ThisPeriodCard";

const DashboardScreen = () => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>Hello UserName!</Text>
          <Text style={styles.text}>Business Name</Text>
        </View>
        <View style={styles.subContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/logoClockaburra.png")}
          />
          <Text style={styles.statusText}>Clocked Out</Text>
        </View>
      </View>
      <Clock></Clock>
      <ScheduleCard></ScheduleCard>
      <ThisPeriodCard></ThisPeriodCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 35,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.primary,
    borderBottomColor: Colors.accent,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  subContainer: {
    justifyContent: "space-between",
  },
  title: {
    color: Colors.accent,
    fontSize: 28,
    fontWeight: "bold",
  },
  text: {
    color: "white",
  },
  statusText: {
    color: Colors.accent,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 3,
  },
});

export default DashboardScreen;
