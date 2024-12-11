import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Styles } from '../assets/style';
import CustomModal from './CustomModal';
import config from '../config/config';
const LoginScreen = ({ navigation }) => {
  const refreshPage = () => {
    window.location.reload();
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const validateFields = () => {
    let isValid = true;
    const errors = { email: '', password: '' };
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      errors.email = 'Enter a valid email';
      isValid = false;
    }

    // Validate password
    if (!password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateFields()) return;
    try {
      const response = await axios.post(`${config.login}`, {
        email,
        password,
      });

      // Handle successful login
      if (response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
        refreshPage();
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        let errorMessages = '';
        for (const field in validationErrors) {
          if (validationErrors.hasOwnProperty(field)) {
            validationErrors[field].forEach((message) => {
              errorMessages += `${message}\n`;
            });
          }
        }
        setModalMessage(errorMessages);
        setModalVisible(true);
      } else if (error.response && error.response.status === 401) {
        setModalMessage('Invalid email or password.');
        setModalVisible(true);
      } else {
        setModalMessage('An error occurred. Please try again.');
        setModalVisible(true);
      }
    }
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.FormCard}>
        <Text style={Styles.title}>Login</Text>

        <TextInput
          style={Styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {error.email ? <Text style={Styles.errorText}>{error.email}</Text> : null}

        <TextInput
          style={Styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        {error.password ? <Text style={Styles.errorText}>{error.password}</Text> : null}

        <TouchableOpacity style={Styles.button} onPress={handleLogin}>
          <Text style={Styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={Styles.registerText} onPress={() => navigation.navigate('Register')}>
          Don't have an account? Register here.
        </Text>
      </View>

      <CustomModal
        isVisible={isModalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};
export default LoginScreen;
