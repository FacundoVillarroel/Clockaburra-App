import AppNavigator from './src/navigation/AppNavigator';

import { SafeAreaView, StatusBar, StyleSheet } from 'react-native/';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { useFonts } from 'expo-font';
import Loading from './src/components/loading/Loading';
import { enableScreens } from 'react-native-screens';

export default function App() {
  const [fontLoaded] = useFonts({
    'Dosis-Bold': require('./assets/fonts/Dosis-Bold.ttf'),
  });

  if (!fontLoaded) {
    return <Loading />;
  }

  if (!__DEV__) {
    console.log('production enviroment');
    enableScreens();
  } else {
    console.log('develpment enviroment');
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar barStyle={'default'}></StatusBar>
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
