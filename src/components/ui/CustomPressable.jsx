import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

const CustomPressable = ({ onPress, style, children, ...rest }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressable,
        pressed && styles.pressedStyle,
        style,
      ]}
      {...rest}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: Colors.primary,
    padding: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  pressedStyle: {
    transform: [{ scale: 0.98 }],
    opacity: 0.8,
  },
});

export default CustomPressable;
