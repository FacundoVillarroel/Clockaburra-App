import { View, Text, StyleSheet, FlatList } from "react-native";

import ProfileHeader from "../components/profile/ProfileHeader";
import Card from "../components/ui/Card";
import Colors from "../constants/colors";

const data = [
  { Name: "Facundo" },
  { Surname: "Villarroel" },
  { Email: "email@gmail.com" },
  { Cellphone: "123456789" },
  { address: "Fake 123" },
];

const renderItem = ({ item }) => (
  <Card>
    <View style={styles.cardContainer}>
      <Text style={styles.cardText}>
        {Object.keys(item)[0]} : {item[Object.keys(item)[0]]}
      </Text>
    </View>
  </Card>
);

const ProfileScreen = () => {
  return (
    <View style={styles.rootContainer}>
      <ProfileHeader />
      <View style={styles.contentContainer}>
        <Text style={styles.subTitle}>Pesonal Details</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => Object.keys(item)[0]}
        />
      </View>
    </View>
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
