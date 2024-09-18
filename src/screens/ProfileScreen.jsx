import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProfileHeader from '../components/profile/ProfileHeader';
import Card from '../components/ui/Card';
import Loading from '../components/loading/Loading';
import Colors from '../constants/colors';
import { logout } from '../store/reducers/auth.slice';
import CustomPressable from '../components/ui/CustomPressable';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [editableData, setEditableData] = useState([
    { address: user.address },
    { email: user.email },
    { name: user.name },
    { phoneNumber: user.phoneNumber },
    { surname: user.surname },
    { role: user.role },
  ]);

  const keyMappings = {
    address: 'Address',
    email: 'Email',
    name: 'Name',
    phoneNumber: 'Phone Number',
    surname: 'Surname',
    role: 'Role',
  };

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
    return (
      <Card>
        <View style={styles.cardContainer}>
          <Text style={styles.cardText}>
            {keyMappings[Object.keys(item)[0]]} :{' '}
          </Text>
          <TextInput
            style={[styles.cardText, editMode ? styles.cardTextInput : null]}
            value={value}
            onChangeText={(text) => handleInputChange(key, text)}
            editable={editMode}
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
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user.id) {
      setLoading(true);
    } else {
      setEditableData([
        { address: user.address },
        { email: user.email },
        { name: user.name },
        { phoneNumber: user.phoneNumber },
        { surname: user.surname },
        { role: user.role },
      ]);
      setLoading(false);
    }
  }, [user.id, user]);

  const onConfirm = () => {
    console.log('Changed');
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View style={[styles.rootContainer, editMode ? { flex: 0.55 } : null]}>
          <ProfileHeader
            logoutHandler={logoutHandler}
            setEditMode={setEditMode}
            editMode={editMode}
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
