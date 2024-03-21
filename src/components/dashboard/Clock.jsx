import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constants/colors";

const Clock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000 * 1);
  }, []);

  const onPressHandler = () => {
    Alert.alert(
      "Start your shift",
      "Are you sure you want to start the shift?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", style: "default" },
      ]
    );
  };

  const formatDate = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.dateText}>{formatDate}</Text>
      </View>
      <Text style={styles.text}>There isn't scheduled shift</Text>
      <Button
        onPress={onPressHandler}
        title="Start no scheduled shift"
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
