import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const CustomPressable = ({ onPress, style, children, ...rest }) => {
  return (
    <Pressable onPress={onPress} style={[styles.pressable, style]} {...rest}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: Colors.primary,
    padding: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
  },
});

export default CustomPressable;
