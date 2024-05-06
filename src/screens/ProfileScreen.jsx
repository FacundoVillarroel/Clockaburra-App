import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProfileHeader from "../components/profile/ProfileHeader";
import Card from "../components/ui/Card";
import Loading from "../components/loading/Loading";
import Colors from "../constants/colors";
import { logout } from "../store/reducers/auth.slice";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);

  const userData = [
    { address: user.address },
    { email: user.email },
    { name: user.name },
    { phoneNumber: user.phoneNumber },
    { surname: user.surname },
    { rol: user.rol },
  ];

  const keyMappings = {
    address: "Address",
    email: "Email",
    name: "Name",
    phoneNumber: "Phone Number",
    surname: "Surname",
    rol: "Role",
  };

  const renderItem = ({ item }) => (
    <Card>
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>
          {keyMappings[Object.keys(item)[0]]} : {item[Object.keys(item)[0]]}
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

  useEffect(() => {
    if (!user.id) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [user.id]);

  return (
    <>
      {loading ? (
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
