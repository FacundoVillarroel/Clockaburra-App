import AppNavigator from "./src/navigation/AppNavigator";

import { SafeAreaView, StatusBar, StyleSheet } from "react-native/";
import { Provider } from "react-redux";
import { store } from "./src/store/store";

export default function App() {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar barStyle={"default"}></StatusBar>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
