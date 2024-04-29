import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import ProfileHeader from "../components/profile/ProfileHeader";
import Card from "../components/ui/Card";
import Colors from "../constants/colors";

const getUserData = async (username, setUserData, setIsLoading) => {
  try {
    const response = await fetch(`http://192.168.0.90:8080/users/${username}`, {
      method: "GET",
    });
    const data = await response.json();
    const filteredData = [
      { address: data.user.address },
      { email: data.user.email },
      { name: data.user.name },
      { phoneNumber: data.user.phoneNumber },
      { surname: data.user.surname },
    ];
    setUserData(filteredData);
    setIsLoading(false);
  } catch (error) {
    console.log("Error:", error);
  }
};

const ProfileScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const username = useSelector((state) => state.auth.username);

  const renderItem = ({ item }) => (
    <Card>
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>
          {Object.keys(item)[0]} : {item[Object.keys(item)[0]]}
        </Text>
      </View>
    </Card>
  );

  useEffect(() => {
    getUserData(username, setUserData, setIsLoading);
  }, []);

  return (
    <>
      {isLoading ? (
        <View>
          <Text>Cargando...</Text>
        </View>
      ) : (
        <View style={styles.rootContainer}>
          <ProfileHeader />
          <View style={styles.contentContainer}>
            <Text style={styles.subTitle}>Pesonal Details</Text>
            <FlatList
              data={userData}
              renderItem={renderItem}
              keyExtractor={(item, index) => Object.keys(item)[0]}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
    marginVertical: 8,
  },
  cardContainer: {
    flexDirection: "row",
  },
  cardText: {
    color: "white",
  },
});

export default ProfileScreen;
