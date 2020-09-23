import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import CartItems from "../../components/shop/CartItems";

const CartScreen = (props) => {
    const cart = useSelector((state) => state.cart.cartItems);
    console.log(cart);
    return (
        <View style={styles.screen}>
            <View>
                <Text>{cart.length} Items</Text>
            </View>
            <View style={styles.line}></View>
            <CartItems data={cart} />
        </View>
    );
};
CartScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "Shopping Cart",
    };
};
const styles = StyleSheet.create({
    screen: {
        padding: 15,
        backgroundColor: "white",
    },
    line: {
        width: "100%",
        height: 3,
        backgroundColor: "black",
        marginVertical: 10,
    },
});
export default CartScreen;
