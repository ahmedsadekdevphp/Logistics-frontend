import React from 'react';
import { View, Text, TouchableOpacity, Stylesheet } from 'react-native';
import { Styles } from '../assets/style';
const HomeScreen = ({ navigation }) => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.meuetitle}>Welcome to Logistics App!</Text>

      <View style={Styles.menuContainer}>
        <TouchableOpacity
          style={Styles.menueCard}
          onPress={() => navigation.navigate('Truck Request')}
        >

          <Text style={Styles.menueCardText}>Request Truck</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={Styles.menueCard}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={Styles.menueCardText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={Styles.menueCard}
          onPress={() => navigation.navigate('Logout')}
        >
          <Text style={Styles.menueCardText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default HomeScreen;
