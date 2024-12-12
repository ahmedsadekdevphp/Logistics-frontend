import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View,ActivityIndicator } from 'react-native';
import { Styles } from '../assets/style';
import CustomModal from './CustomModal';
import config from '../config/config';
export default function TruckRequestScreen() {
  const [location, setLocation] = useState('');
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [pickupTime, setPickupTime] = useState(new Date());
  const [deliveryTime, setDeliveryTime] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const validateFields = () => {
    if (!location.trim()) {
      setModalMessage('Location is required.');
      setModalVisible(true);
      return false;
    }

    if (!size.trim() || isNaN(size) || size <= 0) {
      setModalMessage('Size must be a positive number.');
      setModalVisible(true);
      return false;
    }

    if (!weight.trim() || isNaN(weight) || weight <= 0) {
      setModalMessage('Weight must be a positive number.');
      setModalVisible(true);
      return false;
    }

    if (pickupTime >= deliveryTime) {
      setModalMessage('Delivery time must be later than pickup time.');
      setModalVisible(true);
      return false;
    }

    return true;
  };
  const handleSubmit = async () => {
    if (!validateFields()) return;
    setLoading(true);
    const requestData = {
      location,
      size,
      weight,
      pickupTime: pickupTime.toISOString(),
      deliveryTime: deliveryTime.toISOString(),
    };
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.post(`${config.sendRequest}`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.data.status === 201) {
        setLocation('');
        setSize('');
        setWeight('');
        setPickupTime(new Date());
        setDeliveryTime(new Date());
      }
      setModalMessage(response.data.message);
      setModalVisible(true);

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
        setModalMessage('Network error. Please try again.!');
        setModalVisible(true);
      }
    } finally {
      setLoading(false);
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
          <Text style={Styles.label}>Pickup Time</Text>
            <input
              type="datetime-local"
              value={pickupTime.toISOString().slice(0, 16)}
              onChange={(e) => setPickupTime(new Date(e.target.value))}
              min={new Date().toISOString().slice(0, 16)}
              style={Styles.input}
            />
          </View>
          <View style={Styles.halfWidth}>
          <Text style={Styles.label}>Delivery Time</Text>
            <input
              type="datetime-local"
              value={deliveryTime.toISOString().slice(0, 16)}
              onChange={(e) => setDeliveryTime(new Date(e.target.value))}
              min={new Date().toISOString().slice(0, 16)}
              style={Styles.input}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[Styles.button, loading && Styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <ActivityIndicator color="#fff" /> 
          ) : (
            <Text style={Styles.buttonText}>Submit Request</Text>
          )}
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
