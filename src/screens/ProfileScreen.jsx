import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { useEffect, useState } from "react";

import ProfileHeader from "../components/profile/ProfileHeader";
import Loading from "../components/loading/Loading";
import Card from "../components/ui/Card";
import Colors from "../constants/colors";
import { logout } from "../store/reducers/auth.slice";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state.auth.userId);
  const [user, setUser] = useState({});
  const userData = [
    { address: user.address },
    { email: user.email },
    { name: user.name },
    { phoneNumber: user.phoneNumber },
    { surname: user.surname },
  ];

  // crear user slice
  const getUserInfo = async (userId, setUser) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://192.168.1.101:8080/users/${userId}`);
      const user = await response.json();
      setUser(user.user);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo(userId, setUser);
  }, [userId]);

  const renderItem = ({ item }) => (
    <Card>
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>
          {Object.keys(item)[0]} : {item[Object.keys(item)[0]]}
        </Text>
      </View>
    </Card>
  );

  const logoutHandler = async () => {
    try {
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.rootContainer}>
          <ProfileHeader logoutHandler={logoutHandler} />
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
