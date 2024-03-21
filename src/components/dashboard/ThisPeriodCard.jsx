import { View, Text, StyleSheet } from "react-native";

import ProgressBar from "./ProgressBar";
import Card from "../ui/Card";
import Colors from "../../constants/colors";

const data = { workingDays: 6, daysWorked: 5 };

const ThisPeriodCard = () => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>This Period</Text>
      <Text>Mon, 18 Mar - Sun, 24 Mar</Text>
      <ProgressBar data={data}></ProgressBar>
      <View style={styles.cardContainer}>
        <Card>
          <Text style={styles.cardText}>$0</Text>
          <Text style={styles.cardText}>Earned so far</Text>
        </Card>
        <Card>
          <Text style={styles.cardText}>0/21.5</Text>
          <Text style={styles.cardText}>Hours worked</Text>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
  },
  cardContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  cardText: {
    color: "white",
    textAlign: "center",
  },
});

export default ThisPeriodCard;
