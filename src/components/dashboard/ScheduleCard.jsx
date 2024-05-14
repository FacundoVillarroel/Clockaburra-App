import { View, Text, StyleSheet, FlatList } from "react-native";
import Colors from "../../constants/colors";
import SingleDayContainer from "./SingleDayContainer";
import { DateTime } from "luxon";

const ScheduleCard = ({ workingDays, totalPayment }) => {
  const getDayInformation = (i) => {
    const dayName = DateTime.local()
      .set({ weekday: i })
      .setLocale("en")
      .toFormat("ccc");

    return { dayName: dayName, isWorkingDay: workingDays.includes(dayName) };
  };

  const daysOfWeekInformation = Array.from({ length: 7 }, (_, i) =>
    getDayInformation(i + 1)
  );

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
          data={daysOfWeekInformation}
          scrollEnabled={false}
          horizontal
          keyExtractor={(item) => item.dayName}
          renderItem={({ item }) => (
            <SingleDayContainer
              day={item.dayName[0].toUpperCase()}
              isWorkingDay={item.isWorkingDay}
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
