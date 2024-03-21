import AppNavigator from "./src/navigation/AppNavigator";

import { SafeAreaView, StatusBar, StyleSheet } from "react-native/";

export default function App() {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar barStyle={"default"}></StatusBar>
      <AppNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
