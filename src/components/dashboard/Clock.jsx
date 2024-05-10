import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";

import useClockActions from "../../hooks/useClockActions";

import Colors from "../../constants/colors";

import CustomPressable from "../ui/CustomPressable";
import Loading from "../loading/Loading";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(
    DateTime.local().toFormat("hh:mm a'").toLocaleLowerCase()
  );
  const userId = useSelector((state) => state.user.id);
  const isClockedIn = useSelector((state) => state.clock.clockedIn);
  const isOnBreak = useSelector((state) => state.clock.onBreak);
  const [loading, setLoading] = useState(false);

  const { onCheckIn, onCheckOut, onBreakStart, onBreakEnd } = useClockActions();

  useEffect(() => {
    const syncClock = () => {
      const now = DateTime.local();
      const nextMinute = now.plus({ minutes: 1 }).startOf("minute");
      const delay = nextMinute.diff(now).as("milliseconds");

      const timeoutId = setTimeout(() => {
        setCurrentTime(DateTime.local().toFormat("hh:mm a").toLowerCase());
        syncClock(); // Resynchronize for the next minute
      }, delay);
      return () => clearTimeout(timeoutId); // Clear the timeout when unmounting the component
    };
    syncClock(); // Start the initial synchronization
  }, []);

  const onAction = (action) => {
    switch (action) {
      case "Start Shift":
        onCheckIn(userId, setLoading);
        break;
      case "End Shift":
        onCheckOut(userId, setLoading);
        break;
      case "Start Break":
        onBreakStart(userId, setLoading);
        break;
      case "End Break":
        onBreakEnd(userId, setLoading);
        break;
      default:
        break;
    }
  };

  const onPressHandler = (action) => {
    Alert.alert("Start your shift", `Are you sure you want to ${action}?`, [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        style: "default",
        onPress: () => {
          onAction(action);
        },
      },
    ]);
  };

  //add logic with shifts
  const manageWorkAction = () => {
    return isClockedIn ? "End Shift" : "Start Shift";
  };

  const manageBreakAction = () => {
    return isOnBreak ? "End Break" : "Start Break";
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.dateText}>{currentTime}</Text>
      </View>
      <Text style={styles.text}>There isn't scheduled shift</Text>
      <View style={styles.buttonsContainer}>
        {loading ? (
          <Loading propStyles={propStyles} />
        ) : (
          <>
            <CustomPressable
              onPress={onPressHandler.bind(this, manageWorkAction())}
            >
              <Text style={styles.buttonText}>{manageWorkAction()}</Text>
            </CustomPressable>
            {isClockedIn && (
              <CustomPressable
                onPress={onPressHandler.bind(this, manageBreakAction())}
              >
                <Text style={styles.buttonText}>{manageBreakAction()}</Text>
              </CustomPressable>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },
  dateText: {
    color: Colors.primary,
    fontSize: 50,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
  },
  text: {
    color: Colors.primary,
    fontSize: 16,
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

const propStyles = StyleSheet.create({
  rootContainer: {
    flex: 0,
    paddingVertical: 3,
    paddingHorizontal: 12,
    flexDirection: "row",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    elevation: 5,
    justifyContent: "space-evenly",
  },
  image: {
    height: 50,
    width: 50,
  },
  text: {
    marginTop: 0,
    marginLeft: 5,
    color: "white",
  },
});

export default Clock;
