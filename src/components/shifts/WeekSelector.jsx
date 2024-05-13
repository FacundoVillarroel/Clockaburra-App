import { View, Pressable, Text, StyleSheet } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import Colors from "../../constants/colors";

import { DateTime } from "luxon";

const WeekSelector = ({ selectedWeek, setSelectedWeek }) => {
  const handlePress = (action) => {
    if (action === "next") {
      setSelectedWeek((prevValue) => {
        return DateTime.fromFormat(prevValue, "ccc, dd LLL")
          .plus({ weeks: 1 })
          .toFormat("ccc, dd LLL");
      });
    } else {
      setSelectedWeek((prevValue) => {
        return DateTime.fromFormat(prevValue, "ccc, dd LLL")
          .minus({ weeks: 1 })
          .toFormat("ccc, dd LLL");
      });
    }
  };

  return (
    <View style={styles.weekSelectorContainer}>
      <Pressable style={styles.pressable} onPress={() => handlePress("prev")}>
        <Ionicons name="arrow-back" size={14} />
        <Text style={styles.pressableText}>Prev Week</Text>
      </Pressable>
      <Pressable style={styles.dateContainer}>
        <Text style={styles.dateText}>{selectedWeek}</Text>
      </Pressable>
      <Pressable style={styles.pressable} onPress={() => handlePress("next")}>
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
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  pressableText: {
    color: Colors.primary,
    fontSize: 16,
    paddingHorizontal: 2,
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
