import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderDetailsScreen = ({ route }) => {
  const { orderId } = route.params;
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get(`http://127.0.0.1:8000/api/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setOrderDetails(response.data.data);
      } else {
        Alert.alert('Error', 'Unable to fetch order details.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {orderDetails ? (
        <>
          <Text style={styles.title}>Order No: {orderDetails.order_no}</Text>
          <Text>Status: {orderDetails.last_status ? orderDetails.last_status.name : 'Not Available'}</Text>
          <Text>Location: {orderDetails.location}</Text>
          <Text>Size: {orderDetails.size}</Text>
          <Text>Weight: {orderDetails.weight}</Text>
          <Text>Pickup Time: {orderDetails.pickupTime}</Text>
          <Text>Delivery Time: {orderDetails.deliveryTime}</Text>
        </>
      ) : (
        <Text>No order details available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default OrderDetailsScreen;
