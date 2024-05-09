import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/colors";
import {
  breakEnd,
  breakStart,
  clockIn,
  clockOut,
} from "../../store/reducers/clock.slice";
import Loading from "../loading/Loading";

const Clock = () => {
  const [date, setDate] = useState(new Date());
  const userId = useSelector((state) => state.user.id);
  const isClockedIn = useSelector((state) => state.clock.clockedIn);
  const isOnBreak = useSelector((state) => state.clock.onBreak);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000 * 1);
  }, []);

  const onCheckIn = () => {
    dispatch(clockIn(userId, setLoading));
  };
  const onCheckOut = () => {
    dispatch(clockOut(userId, setLoading));
  };
  const onBreakStart = () => {
    dispatch(breakStart(userId, setLoading));
  };
  const onBreakEnd = () => {
    dispatch(breakEnd(userId, setLoading));
  };

  const onAction = (action) => {
    switch (action) {
      case "Start Shift":
        onCheckIn();
        break;
      case "End Shift":
        onCheckOut();
        break;
      case "Start Break":
        onBreakStart();
        break;
      case "End Break":
        onBreakEnd();
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

  const formatDate = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.dateText}>{formatDate}</Text>
      </View>
      <Text style={styles.text}>There isn't scheduled shift</Text>
      <View style={styles.buttonsContainer}>
        {loading ? (
          <Loading propStyles={propStyles} />
        ) : (
          <>
            <Button
              onPress={() => {
                onPressHandler(manageWorkAction());
              }}
              title={manageWorkAction()}
              color={Colors.primary}
            />
            {isClockedIn ? (
              <Button
                onPress={() => {
                  onPressHandler(manageBreakAction());
                }}
                title={manageBreakAction()}
                color={Colors.primary}
              />
            ) : null}
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
});

const propStyles = {
  rootContainer: {
    flexDirection: "row",
  },
  image: {
    height: 50,
    width: 50,
  },
  text: {
    marginTop: 5,
  },
};

export default Clock;
