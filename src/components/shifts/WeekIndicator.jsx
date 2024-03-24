import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const WeekIndicator = ({ from, to, totalHours, totalEarnings }) => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.dateText}>
        {from} - {to}
      </Text>
      <View style={styles.earningsContainer}>
        <Text style={styles.earningsText}>
          {totalHours}hrs | ${totalEarnings}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    width: "100%",
    marginVertical: 16,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: { fontSize: 15, fontWeight: "bold" },
  earningsContainer: {
    backgroundColor: Colors.secondary,
    padding: 6,
    borderRadius: 10,
  },
  earningsText: { color: "white", fontWeight: "500" },
});

export default WeekIndicator;
