import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

const CartScreen = (props) => {
    const cart = useSelector((state) => state.cart.cartItems);
    console.log(cart);
    return (
        <View>
            <Text>cart screem</Text>
        </View>
    );
};

export default CartScreen;
