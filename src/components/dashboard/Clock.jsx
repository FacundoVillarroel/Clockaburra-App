import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';

import useClockActions from '../../hooks/useClockActions';

import Colors from '../../constants/colors';

import CustomPressable from '../ui/CustomPressable';
import Loading from '../loading/Loading';

const Clock = ({ shifts }) => {
  const [currentTime, setCurrentTime] = useState(
    DateTime.local().toFormat("hh:mm a'").toLocaleLowerCase()
  );
  const [shift, setShift] = useState({});
  const userId = useSelector((state) => state.user.id);
  const isClockedIn = useSelector((state) => state.clock.clockedIn);
  const isOnBreak = useSelector((state) => state.clock.onBreak);
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);

  const { onClockIn, onClockOut, onBreakStart, onBreakEnd } = useClockActions();

  useEffect(() => {
    const syncClock = () => {
      const now = DateTime.local();
      const nextMinute = now.plus({ minutes: 1 }).startOf('minute');
      const delay = nextMinute.diff(now).as('milliseconds');

      const timeoutId = setTimeout(() => {
        setCurrentTime(DateTime.local().toFormat('hh:mm a').toLowerCase());
        syncClock(); // Resynchronize for the next minute
      }, delay);
      return () => clearTimeout(timeoutId); // Clear the timeout when unmounting the component
    };
    syncClock(); // Start the initial synchronization
  }, []);

  useEffect(() => {
    setShift(getNextShiftInfo());
  }, [currentTime, shifts]);

  const getNextShiftInfo = () => {
    const todayISO = DateTime.local().toISODate();
    const todayShift = shifts.find(
      (shift) => DateTime.fromISO(shift.startDate).toISODate() === todayISO
    );
    if (!todayShift) {
      return { today: false };
    }
    const now = DateTime.local();
    const startDateTime = DateTime.fromISO(todayShift.startDate);
    const endDateTime = DateTime.fromISO(todayShift.endDate);

    const today = now.hasSame(startDateTime, 'day');

    const diff = startDateTime.diff(now, ['hours', 'minutes']);
    const hours = Math.floor(diff.hours);
    const minutes = Math.round(diff.minutes % 60);

    let timeToStart;
    if (hours > 0 || minutes >= 60) {
      timeToStart = `${hours}:${minutes.toString().padStart(2, '0')} hs`;
    } else if (minutes > 0) {
      timeToStart = `${minutes} min`;
    } else {
      timeToStart = false;
    }

    const startTime = startDateTime.toFormat('HH:mm');
    const endTime = endDateTime.toFormat('HH:mm');

    return {
      today: today,
      timeToStart: timeToStart,
      startTime: startTime,
      endTime: endTime,
    };
  };

  const onAction = (action) => {
    switch (action) {
      case 'Start Shift':
        onClockIn(userId, setLoading, token);
        break;
      case 'End Shift':
        onClockOut(userId, setLoading, token);
        break;
      case 'Start Break':
        onBreakStart(userId, setLoading, token);
        break;
      case 'End Break':
        onBreakEnd(userId, setLoading, token);
        break;
      default:
        break;
    }
  };

  const onPressHandler = (action) => {
    Alert.alert('Start your shift', `Are you sure you want to ${action}?`, [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes',
        style: 'default',
        onPress: () => {
          onAction(action);
        },
      },
    ]);
  };

  const manageWorkAction = () => {
    return isClockedIn ? 'End Shift' : 'Start Shift';
  };

  const manageBreakAction = () => {
    return isOnBreak ? 'End Break' : 'Start Break';
  };

  const getNextShiftText = () => {
    if (shift.timeToStart) {
      return `Your next shift starts in: ${shift.timeToStart}`;
    } else {
      return `Your shift should have started at ${shift.startTime}hs`;
    }
  };

  const renderNextShiftInfo = () => {
    const endTime = DateTime.fromFormat(shift.endTime, 'HH:mm');
    const now = DateTime.local();
    const hasShiftEndTimePassed = endTime < now;
    if (!isClockedIn) {
      return (
        <View style={styles.nextShiftContainer}>
          {!hasShiftEndTimePassed && ( // shows the shift information if the expected end time of the shift is on the future
            <>
              <Text style={styles.nextShiftText}>
                {getNextShiftText(hasShiftEndTimePassed)}
              </Text>
              <Text style={styles.text}>
                {`${shift.startTime}hs - ${shift.endTime}hs`}
              </Text>
            </>
          )}
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.dateText}>{currentTime}</Text>
      </View>
      {shift.today ? (
        renderNextShiftInfo()
      ) : (
        <Text style={styles.text}>There isn't scheduled shift for today</Text>
      )}
      <View style={styles.buttonsContainer}>
        {loading ? (
          <Loading propStyles={propStyles} />
        ) : (
          <>
            <CustomPressable
              onPress={onPressHandler.bind(this, manageWorkAction())}
            >
              <Text style={styles.buttonText}>{manageWorkAction()}</Text>
            </CustomPressable>
            {isClockedIn && (
              <CustomPressable
                onPress={onPressHandler.bind(this, manageBreakAction())}
              >
                <Text style={styles.buttonText}>{manageBreakAction()}</Text>
              </CustomPressable>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  nextShiftContainer: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  nextShiftText: {
    color: Colors.primary,
    fontWeight: '500',
    fontSize: 16,
  },
  dateText: {
    color: Colors.primary,
    fontSize: 50,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
    paddingTop: 8,
  },
  text: {
    color: Colors.primary,
    fontSize: 16,
    marginVertical: 5,
    paddingVertical: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const propStyles = StyleSheet.create({
  rootContainer: {
    flex: 0,
    paddingVertical: 3,
    paddingHorizontal: 12,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'space-evenly',
  },
  image: {
    height: 50,
    width: 50,
  },
  text: {
    marginTop: 0,
    marginLeft: 5,
    color: 'white',
  },
});

export default Clock;
