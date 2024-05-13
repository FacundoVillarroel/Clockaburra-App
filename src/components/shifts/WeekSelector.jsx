import { View, Pressable, Text, StyleSheet } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import Colors from "../../constants/colors";

const WeekSelector = ({ selectedWeek, setSelectedWeek }) => {
  return (
    <View style={styles.weekSelectorContainer}>
      <Pressable style={styles.pressable}>
        <Ionicons name="arrow-back" size={14} />
        <Text style={styles.pressableText}>Prev Week</Text>
      </Pressable>
      <Pressable style={styles.dateContainer}>
        <Text style={styles.dateText}>{selectedWeek}</Text>
      </Pressable>
      <Pressable style={styles.pressable}>
        <Text style={styles.pressableText}>Next Week </Text>
        <Ionicons name="arrow-forward" size={14} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  weekSelectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  pressable: { flexDirection: "row", alignItems: "center" },
  pressableText: {
    color: Colors.primary,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  dateContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 10,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default WeekSelector;
