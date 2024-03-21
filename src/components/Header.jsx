import { View, Text, StyleSheet, Image } from "react-native";

import Colors from "../constants/colors";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Hello UserName!</Text>
        <Text style={styles.text}>Business Name</Text>
      </View>
      <View style={styles.subContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/logoClockaburra.png")}
        />
        <Text style={styles.statusText}>Clocked Out</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.primary,
    marginBottom: 10,
  },
  subContainer: {
    justifyContent: "space-between",
  },
  title: {
    color: Colors.accent,
    fontSize: 28,
    fontWeight: "bold",
  },
  text: {
    color: "white",
  },
  statusText: {
    color: "white",
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 3,
  },
});

export default Header;
