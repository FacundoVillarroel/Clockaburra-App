import * as ImagePicker from 'expo-image-picker';

export const verifyPermissionsMediaLibrary = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert(
      'Permisos insuficientes',
      'Necesitas dar permisos para utilizar la galeria',
      [{ text: 'Ok' }]
    );
    return false;
  }
  return true;
};

export const verifyPermissionsCamera = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert(
      'Permisos insuficientes',
      'Necesitas dar permisos para usar la cámara',
      [{ text: 'Ok' }]
    );
    return false;
  }
  return true;
};
