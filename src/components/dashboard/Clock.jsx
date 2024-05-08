import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/colors";
import { clockIn, clockOut } from "../../store/reducers/clock.slice";

const Clock = () => {
  const [date, setDate] = useState(new Date());
  const userId = useSelector((state) => state.user.id);
  const isClockedIn = useSelector((state) => state.clock.clockedIn);
  const isOnBreak = useSelector((state) => state.clock.onBreak);
  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000 * 1);
  }, []);

  const onCheckIn = () => {
    dispatch(clockIn(userId));
  };
  const onCheckOut = () => {
    dispatch(clockOut(userId));
  };

  const onPressHandler = () => {
    Alert.alert(
      "Start your shift",
      `Are you sure you want to ${manageWorkAction()}`,
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          style: "default",
          onPress: () => {
            isClockedIn ? onCheckOut() : onCheckIn();
          },
        },
      ]
    );
  };

  //add logic with shifts
  function manageWorkAction() {
    if (!isClockedIn) {
      return "Start Shift";
    } else {
      return "End Shift";
    }
  }

  const formatDate = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.dateText}>{formatDate}</Text>
      </View>
      <Text style={styles.text}>There isn't scheduled shift</Text>
      <Button
        onPress={onPressHandler}
        title={manageWorkAction()}
        color={Colors.primary}
      />
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
  text: {
    color: Colors.primary,
    fontSize: 16,
    marginVertical: 5,
  },
});

export default Clock;
