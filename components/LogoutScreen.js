import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config/config';
import { Styles } from '../assets/style';
const LogoutScreen = () => {
    const refreshPage = () => {
        window.location.reload();
    };
    const logout = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await axios.post(`${config.logout}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                await AsyncStorage.removeItem('userToken');
                refreshPage();
            } else {
                console.log('Unexpected response. Please try again.');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <View style={Styles.container}>
        <View>
            <Text>Are you sure you want to log out?</Text>
            <TouchableOpacity style={Styles.button} onPress={logout}>
                <Text style={Styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
};

export default LogoutScreen;
