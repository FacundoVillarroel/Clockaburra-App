import { View, Text, StyleSheet, FlatList } from "react-native";
import Colors from "../../constants/colors";
import SingleDayContainer from "./SingleDayContainer";

// Replace with data from Database
let UserRate = 30.4;

const workingDays = [
  { day: "monday", isWorkingDay: true, hours: 6 },
  { day: "tuesday", isWorkingDay: false },
  { day: "wednesday", isWorkingDay: false },
  { day: "thursday", isWorkingDay: true, hours: 6.5 },
  { day: "friday", isWorkingDay: true, hours: 7 },
  { day: "saturday", isWorkingDay: true, hours: 6 },
  { day: "sunday", isWorkingDay: true, hours: 8 },
];

const totalHours = workingDays
  .filter((day) => day.isWorkingDay)
  .reduce((acc, day) => acc + day.hours, 0);

const totalPayment = totalHours * UserRate;

const ScheduleCard = () => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.textsContainer}>
        <View>
          <Text style={styles.titleText}>Your Schedule</Text>
        </View>
        <View>
          <Text style={styles.earningText}>${totalPayment}</Text>
        </View>
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={workingDays}
          scrollEnabled={false}
          horizontal
          keyExtractor={(item) => item.day}
          renderItem={(item) => (
            <SingleDayContainer
              day={item.item.day[0].toUpperCase()}
              isWorkingDay={item.item.isWorkingDay}
            ></SingleDayContainer>
          )}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.primary,
  },
  textsContainer: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 18,
    color: "white",
  },
  earningText: {
    color: "white",
  },
  flatListContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});

export default ScheduleCard;
