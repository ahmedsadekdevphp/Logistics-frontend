import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Styles } from '../assets/style';
import config from '../config/config';
import CustomModal from './CustomModal';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');



    const validateFields = () => {
        let isValid = true;
        const errors = { name: '', email: '', password: '', passwordConfirmation: '' };
        if (!name) {
            errors.name = 'Name is required';
            isValid = false;
        }
        if (!email) {
            errors.email = 'Email is required';
            isValid = false;
        }
        if (!password) {
            errors.password = 'Password is required';
            isValid = false;
        }
        if (!passwordConfirmation) {
            errors.passwordConfirmation = 'passwordConfirmation is required';
            isValid = false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Please enter a valid email address.';
            isValid = false;
        }
        if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters long.';
            isValid = false;
        }
        if (password !== passwordConfirmation) {
            errors.password = 'Passwords do not match.';
            isValid = false;
        }
        setError(errors);
        return isValid;
    };

    const handleRegister = async () => {
        if (!validateFields()) return;
        try {
            const response = await axios.post(`${config.register}`, {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            if (response.status === 200) {
                setModalMessage('Registration successfull!');
                setModalVisible(true);
                setName('');
                setEmail('');
                setPassword('');
                setPasswordConfirmation('');
                setError('');
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
            } else {
                console.log(error.response.status);
                setModalMessage('Network error. Please try again.!');
                setModalVisible(true);
            }
        }
    };

    return (
        <View style={Styles.container}>
            <View style={Styles.FormCard}>
                <Text style={Styles.title}>Register</Text>

                <TextInput
                    style={Styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                {error.name ? <Text style={Styles.errorText}>{error.name}</Text> : null}

                <TextInput
                    style={Styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                {error.email ? <Text style={Styles.errorText}>{error.email}</Text> : null}

                <TextInput
                    style={Styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                {error.password ? <Text style={Styles.errorText}>{error.password}</Text> : null}

                <TextInput
                    style={Styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={passwordConfirmation}
                    onChangeText={setPasswordConfirmation}
                />
                {error.passwordConfirmation ? (
                    <Text style={Styles.errorText}>{error.passwordConfirmation}</Text>
                ) : null}

                {success ? <Text style={Styles.successText}>{success}</Text> : null}

                <TouchableOpacity style={Styles.button} onPress={handleRegister}>
                    <Text style={Styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
            <CustomModal
                isVisible={isModalVisible}
                message={modalMessage}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );

};

export default RegisterScreen;
