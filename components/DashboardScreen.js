import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,  TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Styles } from '../assets/style';
import config from '../config/config';
const DashboardScreen = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async (page = 1) => {
        setLoading(true); // Set loading to true when a fetch starts

        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await axios.get(`${config.dashboard}?page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setOrders(response.data.data.data);
                setCurrentPage(response.data.data.current_page);
                setTotalPages(response.data.data.last_page);
            } else {
                console.error('Failed to fetch orders:', response);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch orders on component mount
    useEffect(() => {
        fetchOrders();
    }, []);

    // Render each order item
    const renderOrderItem = ({ item }) => (
        <View style={Styles.orderItem}>
            <Text style={Styles.idText}>Order ID: {item.order_no}</Text>
            <Text>Pickup Time: {item.pickupTime}</Text>
            <Text>Delivery Time: {item.deliveryTime}</Text>
            <View
                style={[Styles.badge, { backgroundColor: item.last_status.status_name.style }]}
            >
                <Text style={Styles.badgeText}>{item.last_status.status_name.name}</Text>
            </View>
        </View>
    );

    // Handle pagination button clicks
    const handlePagination = (page) => {
        if (page >= 1 && page <= totalPages) {
            fetchOrders(page);
        }
    };

    return (
        <View style={Styles.cardContainer}>
            <Text style={Styles.title}>My Orders Details</Text>

            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={renderOrderItem}
                ListFooterComponent={loading ? <Text>Loading...</Text> : null}
            />
            <View style={Styles.paginationContainer}>
                <TouchableOpacity
                    style={[Styles.paginationButton, currentPage === 1 && Styles.disabledButton]}
                    onPress={() => handlePagination(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                >
                    <Text style={Styles.paginationText}>Previous</Text>
                </TouchableOpacity>

                <Text style={Styles.pageNumber}>{`Page ${currentPage} of ${totalPages}`}</Text>

                <TouchableOpacity
                    style={[Styles.paginationButton, currentPage === totalPages && Styles.disabledButton]}
                    onPress={() => handlePagination(currentPage + 1)}
                    disabled={currentPage === totalPages || loading}
                >
                    <Text style={Styles.paginationText}>Next</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};
export default DashboardScreen;
