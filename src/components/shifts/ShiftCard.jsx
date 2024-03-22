import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/colors";

const ShiftCard = ({ date, from, to, hours, earnings }) => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.subContainter}>
        <View style={styles.topContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.dayText}> {date} </Text>
            <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={14} color="white" />
              <Text style={styles.timeText}>
                {" "}
                {from}- {to}{" "}
              </Text>
            </View>
          </View>
          <View style={styles.earningsContainer}>
            <Text style={styles.earningsText}>
              {hours}hs | ${earnings}
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
