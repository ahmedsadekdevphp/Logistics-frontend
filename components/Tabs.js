import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import TruckRequestScreen from './TruckRequestScreen';
import HomeScreen from './HomeScreen';
import DashboardScreen from './DashboardScreen';
import LogoutScreen from './LogoutScreen';
const Tab = createMaterialTopTabNavigator();

export default function Tabs() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        };
        checkLoginStatus();
    }, []);
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'settings' : 'settings-outline';
                        } else if (route.name === 'Register') {
                            iconName = focused ? 'person-add' : 'person-add-outline';
                        } else if (route.name === 'Login') {
                            iconName = focused ? 'log-in' : 'log-in-outline';
                        } else if (route.name === 'Truck Request') {
                            iconName = focused ? 'car' : 'car-outline';
                        } else if (route.name === 'Dashboard') {
                            iconName = focused ? 'grid' : 'grid-outline';
                        } else if (route.name === 'Logout') {
                            iconName = focused ? 'log-out' : 'log-out-outline';
                        }

                        return <Icon name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: 'white',
                    tabBarStyle: {
                        backgroundColor: '#764abc',
                        height: 60,
                    },
                    tabBarLabelStyle: {
                        fontSize: 9,
                        fontWeight: '600',
                    },
                    headerStyle: {
                        backgroundColor: '#f8f9fb',
                        height: 40,
                        borderBottomColor: '#f8f9fb',
                    },
                    headerTintColor: '#764abc',
                })}
            >
                {!isLoggedIn && <Tab.Screen name="Login" component={LoginScreen} />}
                {!isLoggedIn && <Tab.Screen name="Register" component={RegisterScreen} />}
                {isLoggedIn && <Tab.Screen name="Home" component={HomeScreen} />}
                {isLoggedIn && <Tab.Screen name="Truck Request" component={TruckRequestScreen} />}
                {isLoggedIn && <Tab.Screen name="Dashboard" component={DashboardScreen} />}
                {isLoggedIn && <Tab.Screen name="Logout" component={LogoutScreen} />}

            </Tab.Navigator>
        </NavigationContainer>
    );
}
