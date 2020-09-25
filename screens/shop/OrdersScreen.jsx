import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const OrderScreen = (props) => {
    console.log("in");
    console.log(useSelector((state) => state.order.orders));
    return (
        <View>
            <Text> Order screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default OrderScreen;
