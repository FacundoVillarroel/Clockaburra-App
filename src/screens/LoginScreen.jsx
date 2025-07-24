import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { login } from '../store/reducers/auth.slice';

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const handleInputChange = (name, value) => {
    if (name === 'email') {
      value = value.toLowerCase();
    }
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(values.email)) {
        Alert.alert('Error', 'El email no es válido');
        return;
      }
      if (values.password.length < 8) {
        Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
        return;
      }
      const response = await dispatch(
        login(values.email, values.password, setIsLoading)
      );
      if (response.isError) {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error: Internal server error, please try again later');
      console.error('LoginScreen, handleLogin:', error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={require('../../assets/logoClockaburra.png')}
        />
        <Text style={styles.logoName}>Clockaburra</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(text) => handleInputChange('email', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          onChangeText={(text) => handleInputChange('password', text)}
        />
        <MaterialCommunityIcons
          name={showPassword ? 'eye-off' : 'eye'}
          size={24}
          color={Colors.primary}
          style={styles.eyeIcon}
          onPress={toggleShowPassword}
        />
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={isLoading ? () => {} : handleLogin}
      >
        <Text style={styles.loginText}>
          {isLoading ? 'Loading...' : 'Login'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.forgotPassword}>Forgot password?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  logoImage: {
    width: 70,
    height: 70,
  },
  logoName: {
    fontSize: 48,
    fontFamily: 'Dosis-Bold',
    fontWeight: 'Bold',
    marginLeft: 8,
    color: Colors.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 48,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  loginButton: {
    width: '80%',
    height: 48,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  loginWithContainer: {
    width: '80%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  loginWithText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  forgotPassword: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
});

export default LoginScreen;
