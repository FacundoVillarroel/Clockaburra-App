import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProfileHeader from '../components/profile/ProfileHeader';
import Card from '../components/ui/Card';
import Loading from '../components/loading/Loading';
import Colors from '../constants/colors';
import { logout } from '../store/reducers/auth.slice';
import { updateUser } from '../store/reducers/user.slice';
import CustomPressable from '../components/ui/CustomPressable';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [editableData, setEditableData] = useState([]);
  const [newProfileImage, setNewProfileImage] = useState(null);

  const keyMappings = {
    address: 'Address',
    email: 'Email',
    name: 'Name',
    phoneNumber: 'Phone Number',
    surname: 'Surname',
    role: 'Role',
    department: 'Department',
    startDate: 'Start Date',
    hourlyRate: 'Hourly Rate',
  };

  const getUserData = () => [
    { address: user.address },
    { email: user.email },
    { name: user.name },
    { phoneNumber: user.phoneNumber },
    { surname: user.surname },
    { role: user.role },
    { department: user.department },
    { startDate: user.startDate.split('T')[0] },
    { hourlyRate: user.hourlyRate.toString() },
  ];

  const handleInputChange = (key, value) => {
    if (key === 'phoneNumber') {
      value = parseInt(value);
    }
    setEditableData((prevData) => {
      return prevData.map((item) => {
        if (Object.keys(item)[0] === key) {
          return { [key]: value };
        }
        return item;
      });
    });
  };

  const renderItem = ({ item }) => {
    const key = Object.keys(item)[0];
    let value = null;
    if (key === 'phoneNumber') {
      value = item[key].toString();
    } else {
      value = item[key];
    }

    const isNonEditableField =
      key === 'role' ||
      key === 'department' ||
      key === 'email' ||
      key === 'startDate' ||
      key === 'hourlyRate';
    return (
      <Card>
        <View style={styles.cardContainer}>
          <Text style={styles.cardText}>
            {keyMappings[Object.keys(item)[0]]} :{' '}
          </Text>
          <TextInput
            style={[
              styles.cardText,
              editMode && !isNonEditableField ? styles.cardTextInput : null,
            ]}
            value={value}
            onChangeText={(text) => handleInputChange(key, text)}
            editable={editMode && !isNonEditableField}
            placeholder={keyMappings[key]}
          />
        </View>
      </Card>
    );
  };

  const logoutHandler = async () => {
    try {
      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user.id) {
      setLoading(true);
    } else {
      setEditableData(getUserData());
      setLoading(false);
    }
  }, [user]);

  const handleEditMode = () => {
    if (editMode) {
      Alert.alert(
        'Cancel changes?',
        'Are you sure you want to cancel your changes?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              setEditMode(false);
              setEditableData(getUserData());
            },
          },
        ]
      );
    } else {
      setEditMode(true);
    }
  };

  const onConfirm = () => {
    Alert.alert(
      'Update details',
      'Are you sure you want to update your details?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'default',
          onPress: () => {
            const userUpdate = editableData.reduce((acc, item) => {
              const key = Object.keys(item)[0]; // Gets the key of the current object
              acc[key] = item[key]; // Assigns the value to the accumulator object
              return acc; // Returns the accumulator for the next iteration
            }, {});
            if (newProfileImage) {
              userUpdate.image = newProfileImage;
            }
            dispatch(updateUser(userUpdate, user.id, token, setLoading));
            setEditMode(false);
          },
        },
      ]
    );
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View style={[styles.rootContainer, editMode ? { flex: 0.55 } : null]}>
          <ProfileHeader
            logoutHandler={logoutHandler}
            handleEditMode={handleEditMode}
            editMode={editMode}
            setNewProfileImage={setNewProfileImage}
          />
          <View style={styles.contentContainer}>
            <Text style={styles.subTitle}>Pesonal Details</Text>
            <FlatList
              data={editableData}
              renderItem={renderItem}
              keyExtractor={(item, index) => Object.keys(item)[0]}
            />
            {editMode && (
              <View style={styles.buttonContainer}>
                <CustomPressable
                  style={styles.confirmButton}
                  onPress={onConfirm}
                >
                  <Text style={styles.confirmText}>Confirm</Text>
                </CustomPressable>
              </View>
            )}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 0.65,
  },
  contentContainer: {
    padding: 16,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginVertical: 8,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    color: 'white',
  },
  cardTextInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    paddingHorizontal: 6,
  },
  buttonContainer: {
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: Colors.accent,
  },
  confirmText: {
    fontSize: 20,
    color: Colors.primary,
  },
});

export default ProfileScreen;
