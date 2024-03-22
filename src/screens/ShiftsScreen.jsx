import { View, StyleSheet, FlatList } from "react-native";

import WeekSelector from "../components/shifts/WeekSelector";
import WeekIndicator from "../components/shifts/WeekIndicator";
import ShiftCard from "../components/shifts/ShiftCard";

import shifts from "../data/shifts";

const totalHours = shifts.reduce((total, shift) => total + shift.hours, 0);
const totalEarnings = shifts.reduce(
  (total, shift) => total + shift.earnings,
  0
);

const ShiftsScreen = () => {
  return (
    <View style={styles.rootContainer}>
      <WeekSelector />
      <WeekIndicator
        from={"Mon, 18 Mar"}
        to={"Sun, 24 Mar"}
        totalHours={totalHours}
        totalEarnings={totalEarnings}
      />
      <FlatList
        data={shifts}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <ShiftCard
            date={item.date}
            hours={item.hours}
            earnings={item.earnings}
            from={item.from}
            to={item.to}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});

export default ShiftsScreen;
