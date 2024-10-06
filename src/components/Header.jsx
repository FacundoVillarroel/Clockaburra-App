import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../constants/colors';
const defaultImage = require('../../assets/logoClockaburra.png');

const Header = ({ navigation, route }) => {
  const { name, image } = useSelector((state) => state.user);
  const clockStatus = useSelector((state) => state.clock);

  const handlePress = () => {
    navigation.navigate('profile');
  };
  const routeName = route.name[0].toUpperCase() + route.name.slice(1);

  const textContent = routeName !== 'Dashboard' ? routeName : 'Business Name';

  const clockStatusText = () => {
    if (clockStatus.clockedIn) {
      if (clockStatus.onBreak) {
        return 'On Break';
      } else {
        return 'Clocked In';
      }
    } else {
      return 'Clocked out';
    }
  };

  const getStatusColor = () => {
    if (clockStatus.clockedIn) {
      if (clockStatus.onBreak) {
        return 'yellow';
      } else {
        return 'green';
      }
    } else {
      return 'red';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Hi {name}!</Text>
        <Text style={styles.text}>{textContent}</Text>
      </View>
      <Pressable style={styles.pressable} onPress={handlePress}>
        <View style={styles.imageContainter}>
          <Image
            style={styles.image}
            source={image ? { uri: image } : defaultImage}
          />
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{clockStatusText()}</Text>
          <View
            style={{ ...styles.statusColor, backgroundColor: getStatusColor() }}
          ></View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
    marginBottom: 10,
  },
  subContainer: {
    justifyContent: 'space-between',
  },
  pressable: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: Colors.accent,
    fontSize: 28,
    fontWeight: 'bold',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    color: 'white',
  },
  statusColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  imageContainter: {
    borderColor: Colors.accent,
    borderWidth: 2,
    height: 60,
    width: 60,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Header;
