import { View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const Card = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
});

export default Card;
