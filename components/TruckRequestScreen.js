import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Styles } from '../assets/style';
import CustomModal from './CustomModal';
export default function TruckRequestScreen() {
  const [location, setLocation] = useState('');
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [pickupTime, setPickupTime] = useState(new Date());
  const [deliveryTime, setDeliveryTime] = useState(new Date());
  const [showPickupPicker, setShowPickupPicker] = useState(false);
  const [showDeliveryPicker, setShowDeliveryPicker] = useState(false);
  const [error, setError] = useState({ email: '', password: '' });
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = async () => {
    if (!location || !size || !weight) {
      setModalMessage('Please fill in all fields!');
      setModalVisible(true);
    }
    const requestData = {
      location,
      size,
      weight,
      pickupTime: pickupTime.toISOString(),
      deliveryTime: deliveryTime.toISOString(),
    };

    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.post('http://127.0.0.1:8000/api/orders', requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const orderNo = response.data.data;
        setModalMessage(`Your order was successfully submitted! Order number is: ${orderNo}`);
        setModalVisible(true);
      } else {
        setModalMessage('Unexpected response. Please try again.');
        setModalVisible(true);
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
        setModalMessage('You are not authorized !');
        setModalVisible(true);
      }
      else {
        //setModalMessage('Network error. Please try again.!');
        //setModalVisible(true);
      }
    }
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.RequestCard}>
        <Text style={Styles.title}>Truck Request Form</Text>

        <TextInput
          style={Styles.input}
          placeholder="Enter location"
          value={location}
          onChangeText={setLocation}
        />

        <View style={Styles.row}>
          <View style={Styles.halfWidth}>
            <TextInput
              style={Styles.input}
              placeholder="Enter size"
              value={size}
              onChangeText={setSize}
            />
          </View>
          <View style={Styles.halfWidth}>
            <TextInput
              style={Styles.input}
              placeholder="Enter weight"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={Styles.row}>
          <View style={Styles.halfWidth}>
            <input
              type="datetime-local"
              value={pickupTime.toISOString().slice(0, 16)}
              onChange={(e) => setPickupTime(new Date(e.target.value))}
              style={Styles.input}
            />
          </View>
          <View style={Styles.halfWidth}>
            <input
              type="datetime-local"
              value={deliveryTime.toISOString().slice(0, 16)}
              onChange={(e) => setDeliveryTime(new Date(e.target.value))}
              style={Styles.input}
            />
          </View>
        </View>
        <TouchableOpacity style={Styles.button} onPress={handleSubmit}>
          <Text style={Styles.buttonText}>Submit Request</Text>
        </TouchableOpacity>
        <CustomModal
          isVisible={isModalVisible}
          message={modalMessage}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </View>
  );
}
