import { View, StyleSheet, Image, Text, Pressable, Alert } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import Colors from "../../constants/colors";

const ProfileHeader = ({ logoutHandler }) => {
  const name = useSelector((state) => state.user.user.name);
  const surname = useSelector((state) => state.user.user.surname);

  const onLogoutPress = () => {
    Alert.alert("Log Out", "Are you sure you want to Log Out?", [
      { text: "No", style: "cancel" },
      { text: "Yes", style: "default", onPress: logoutHandler },
    ]);
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.userDataContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../../assets/logoClockaburra.png")}
          />
        </View>
        <Text style={styles.text}>
          {name} {surname}
        </Text>
      </View>
      <View style={styles.iconsContainer}>
        <Pressable onPress={onLogoutPress}>
          <Ionicons name="log-out" color={"white"} size={35} />
        </Pressable>
        <Pressable>
          <Ionicons name="ellipsis-horizontal" color={"white"} size={35} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.primary,
  },
  userDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderColor: Colors.accent,
    borderWidth: 5,
    height: 100,
    width: 100,
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
  },
  text: {
    paddingTop: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.accent,
  },
  iconsContainer: {
    position: "absolute",
    height: "100%",
    justifyContent: "space-evenly",
    alignContent: "center",
    right: 25,
  },
});

export default ProfileHeader;
