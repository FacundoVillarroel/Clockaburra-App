import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DateTime } from 'luxon';

import Colors from '../../constants/colors';
import { useState, useEffect } from 'react';

const ShiftCard = ({ startDate, endDate, hours, breaks, hourlyRate }) => {
  const [expanded, setExpanded] = useState(false);
  const [rotation] = useState(new Animated.Value(0));

  const startDateObj = DateTime.fromISO(startDate);
  const endDateObj = DateTime.fromISO(endDate);
  const startDateFormatted = startDateObj.toFormat('ccc, dd LLL');
  const from = startDateObj.toFormat("HH:mm a'").toLocaleLowerCase();
  const to = endDateObj.toFormat("HH:mm a'").toLocaleLowerCase();
  const totalHours = Math.floor(hours);
  const minutes = Math.round((hours - totalHours) * 60);
  const formattedWorkedHours = `${totalHours}:${minutes}`;
  const earnings = (hours * hourlyRate).toFixed(2);

  const getbreakHours = () => {
    if (breaks.length) {
      const breakStart = DateTime.fromISO(breaks[0].breakStart);
      const breakEnd = DateTime.fromISO(breaks[0].breakEnd);
      const diffMinutes = breakEnd.diff(breakStart, 'minutes').minutes;

      let diffFormatted;

      if (diffMinutes >= 60) {
        const diffHours = diffMinutes / 60;
        diffFormatted = `${diffHours.toFixed(1)} hrs`;
      } else {
        diffFormatted = `${diffMinutes.toFixed(1)} min`;
      }
      return {
        total: diffFormatted,
        start: breakStart.toFormat('hh:mm a'),
        end: breakEnd.toFormat('hh:mm a'),
      };
    }
  };

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [expanded]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const onPressHandler = () => {
    setExpanded((oldValue) => !oldValue);
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.topContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.dayText}> {startDateFormatted} </Text>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={14} color="white" />
            <Text style={styles.timeText}>
              {' '}
              {from} - {to}{' '}
            </Text>
          </View>
        </View>
        <View style={styles.earningsContainer}>
          <Text style={styles.earningsText}>
            {formattedWorkedHours}hs | ${earnings}
          </Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.workPlaceText}>Working Place</Text>
        <Pressable onPress={onPressHandler}>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Ionicons name={'chevron-down'} size={18} color="white" />
          </Animated.View>
        </Pressable>
      </View>
      {expanded && (
        <View style={styles.expansionContainer}>
          <Text style={styles.expansionText}>
            {breaks.length ? `Breaks: ${getbreakHours().total} ` : 'No Breaks'}
          </Text>
          <Text style={styles.expansionText}>
            {breaks.length
              ? `From: ${getbreakHours().start} - To: ${getbreakHours().end}`
              : ''}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.primary,
    padding: 16,
    marginBottom: 8,
  },
  topContainer: {
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {},
  dayText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  timeContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: { color: 'white' },
  earningsContainer: {
    backgroundColor: 'white',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  earningsText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  workPlaceText: {
    color: 'white',
  },
  expansionContainer: {
    flexDirection: 'column',
    paddingTop: 4,
  },
  expansionText: {
    color: 'white',
    paddingVertical: 2,
  },
});

export default ShiftCard;
