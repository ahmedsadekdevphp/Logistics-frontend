import React from 'react';
import { View, Text, TouchableOpacity, Stylesheet } from 'react-native';
import { Styles } from '../assets/style';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.meuetitle}>Welcome to Logistics App!</Text>

      <View style={Styles.menuContainer}>
        <TouchableOpacity
          style={Styles.menueCard}
          onPress={() => navigation.navigate('Truck Request')}
        >
         <Icon name='car' style={Styles.iconStyle}  />

          <Text style={Styles.menueCardText}>Request Truck</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={Styles.menueCard}
          onPress={() => navigation.navigate('Dashboard')}
        >
                   <Icon name='grid' style={Styles.iconStyle}   />
          <Text style={Styles.menueCardText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={Styles.menueCard}
          onPress={() => navigation.navigate('Logout')}
        >
                             <Icon name='log-out' style={Styles.iconStyle}   />
          <Text style={Styles.menueCardText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default HomeScreen;
