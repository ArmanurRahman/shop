import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartItems from "../../components/shop/CartItems";
import MainButton from "../../components/MainButton";
import * as orderActions from "../../store/action/order";

const CartScreen = (props) => {
    const cart = useSelector((state) => state.cart.cartItems);
    const totalSum = useSelector((state) => state.cart.totalSum);

    const dispatch = useDispatch();
    const checkOutHandler = () => {
        dispatch(orderActions.placeOrder(cart));
    };
    return (
        <View style={styles.screen}>
            <View>
                <Text>{cart.length} Items</Text>
            </View>
            <View style={styles.line}></View>
            <CartItems data={cart} />
            <View>
                <Text style={styles.total}>Total ${totalSum}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <MainButton onPress={checkOutHandler}>Add To Cart</MainButton>
            </View>
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
    total: {
        textAlign: "right",
        fontSize: 20,
    },
});
export default CartScreen;
