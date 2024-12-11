// CustomModal.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Styles } from '../assets/style'; 

const CustomModal = ({ isVisible, message, onClose }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={Styles.modalContent}>
        <Text style={Styles.modalText}>{message}</Text>
        <TouchableOpacity style={Styles.closeButton} onPress={onClose}>
          <Text style={Styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
export default CustomModal;
