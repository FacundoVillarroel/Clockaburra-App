import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/colors';

const ModalComponent = ({
  setModalVisible,
  modalVisible,
  onPress,
  title,
  option1,
  option2,
}) => {
  return (
    <Modal
      style={styles.modalContainer}
      visible={modalVisible}
      transparent
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.btnCloseContainer}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Ionicons name="close" size={30} color={Colors.primary} />
              </TouchableOpacity>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => onPress(option1.action)}
                >
                  <Ionicons
                    name={option1.icon}
                    size={40}
                    color={Colors.primary}
                  />
                  <Text style={styles.btnText}>{option1.text}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => onPress(option2.action)}
                >
                  <Ionicons
                    name={option2.icon}
                    size={40}
                    color={Colors.primary}
                  />
                  <Text style={styles.btnText}>{option2.text}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: Colors.accent,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  btnCloseContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    fontFamily: 'Dosis-Bold',
    color: Colors.primary,
    fontSize: 18,
    paddingVertical: 30,
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  touchableContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    paddingVertical: 5,
  },
});
