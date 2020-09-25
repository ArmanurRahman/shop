import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import OrderItems from "../../components/shop/OrderItems";

const OrderScreen = (props) => {
    const orders = useSelector((state) => state.order.orders);

    return (
        <View>
            <OrderItems data={orders} />
        </View>
    );
};

const styles = StyleSheet.create({});

export default OrderScreen;
