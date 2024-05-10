import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DateTime } from "luxon";

import Colors from "../../constants/colors";

const ShiftCard = ({ startDate, endDate, workedHours, breaks, hourlyRate }) => {
  const startDateObj = DateTime.fromISO(startDate);
  const endDateObj = DateTime.fromISO(endDate);
  const startDateFormatted = startDateObj.toFormat("ccc, dd LLL");
  const from = startDateObj.toFormat("HH:mm a'").toLocaleLowerCase();
  const to = endDateObj.toFormat("HH:mm a'").toLocaleLowerCase();
  const hours = Math.floor(workedHours);
  const minutes = Math.round((workedHours - hours) * 60);
  const formattedWorkedHours = `${hours}:${minutes}`;
  const earnings = (workedHours * hourlyRate).toFixed(2);

  //calculation of break hours
  if (breaks.length) {
    const breakStart = DateTime.fromISO(breaks[0].timeStamp);
    const breakEnd = DateTime.fromISO(breaks[1].timeStamp);
    const diffMinutes = breakEnd.diff(breakStart, "minutes").minutes;
    const diffHours = diffMinutes / 60;

    const diffHoursFormatted = diffHours.toFixed(2);
    //console.log("Breaks: ", diffHoursFormatted, "hs");
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.subContainter}>
        <View style={styles.topContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.dayText}> {startDateFormatted} </Text>
            <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={14} color="white" />
              <Text style={styles.timeText}>
                {" "}
                {from} - {to}{" "}
              </Text>
            </View>
          </View>
          <View style={styles.earningsContainer}>
            <Text style={styles.earningsText}>
              {formattedWorkedHours}hs | ${earnings}
            </Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.workPlaceText}>Working Place</Text>
          <Ionicons name="chevron-forward" size={18} color="white" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.primary,
    padding: 16,
    marginBottom: 8,
  },
  subContainter: {},
  topContainer: {
    marginVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateContainer: {},
  dayText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  timeContainer: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: { color: "white" },
  earningsContainer: {
    backgroundColor: "white",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  earningsText: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  workPlaceText: {
    color: "white",
  },
});

export default ShiftCard;
