import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Image, Text, Animated, Easing } from "react-native";
import Colors from "../../constants/colors";

const Loading = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.rootContainer}>
      <Animated.Image
        style={[styles.image, { transform: [{ rotate: spin }] }]}
        source={require("../../../assets/logoClockaburra.png")}
      />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 250,
    width: 275,
  },
  text: {
    marginTop: 20,
    color: Colors.primary,
    fontSize: 20,
  },
});
