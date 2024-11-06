import { TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Modal from '../ui/CustomModal';
import {
  verifyPermissionsCamera,
  verifyPermissionsMediaLibrary,
} from '../../helpers/verifyPermissions';

import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

const ImageSelector = ({
  children,
  onImagePicked,
  style,
  imageStyle,
  image = null,
  index,
  editMode,
}) => {
  const [pickedUrl, setPickedUrl] = useState(image);
  const [modalVisible, setModalVisible] = useState(false);

  const onHandleImage = async (option) => {
    let result = null;
    try {
      if (option === 'camera') {
        const isCameraPermissions = await verifyPermissionsCamera();
        if (!isCameraPermissions) return;

        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          aspect: [4, 4],
          quality: 0.8,
        });
      } else if (option === 'gallery') {
        const isCameraPermissions = await verifyPermissionsMediaLibrary();
        if (!isCameraPermissions) return;

        result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          aspect: [4, 4],
          quality: 0.8,
        });
      }

      if (!result.canceled) {
        setPickedUrl(result.assets[0].uri);
        onImagePicked({ uri: result.assets[0].uri, index });
        setModalVisible(false);
      }
    } catch (error) {
      console.error('ImageSelector, onHandleImage:', error);
    }
  };

  useEffect(() => {
    if (!editMode) return setPickedUrl(null);
  }, [editMode]);

  return (
    <>
      {
        <TouchableOpacity
          style={{ ...styles.container, ...style }}
          onPress={() => setModalVisible(!modalVisible)}
        >
          {pickedUrl && editMode ? (
            <Image
              style={{ ...styles.image, ...imageStyle }}
              source={{ uri: pickedUrl }}
            />
          ) : (
            children
          )}
          <Modal
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            onPress={onHandleImage}
            title={'Where you want to choose your image from?'}
            option1={{ icon: 'camera', text: 'Camera', action: 'camera' }}
            option2={{ icon: 'image', text: 'Galery', action: 'gallery' }}
          />
        </TouchableOpacity>
      }
    </>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.accent,
    borderWidth: 5,
    height: 100,
    width: 100,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
