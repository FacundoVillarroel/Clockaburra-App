import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Colors from "../constants/colors";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.container}>
        <Text style={styles.title}>Clockaburra App</Text>
        <Image
          source={require("../../assets/logoClockaburra.png")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.text}>By Facundo Villarroel with ♥</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    backgroundColor: Colors.primary,
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  logo: {
    width: 50,
    height: 50,
  },
  text: {
    color: "#fff",
    fontSize: 12,
  },
});

export default Footer;
