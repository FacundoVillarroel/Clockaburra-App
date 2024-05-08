import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useSelector } from "react-redux";

import Colors from "../constants/colors";

const Header = ({ navigation, route }) => {
  const name = useSelector((state) => state.user.name);
  const clockStatus = useSelector((state) => state.clock);

  const handlePress = () => {
    navigation.navigate("profile");
  };
  const routeName = route.name[0].toUpperCase() + route.name.slice(1);

  const textContent = routeName !== "Dashboard" ? routeName : "Business Name";

  const clockStatusText = () => {
    if (clockStatus.clockedIn) {
      if (clockStatus.onBreak) {
        return "On Break";
      } else {
        return "Clocked In";
      }
    } else {
      return "Clocked out";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Hi {name}!</Text>
        <Text style={styles.text}>{textContent}</Text>
      </View>
      <Pressable style={styles.subContainer} onPress={handlePress}>
        <Image
          style={styles.image}
          source={require("../../assets/logoClockaburra.png")}
        />
        <Text style={styles.statusText}>{clockStatusText()}</Text>
      </Pressable>
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
    fontWeight: "bold",
    fontSize: 20,
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
