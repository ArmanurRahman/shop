import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartItems from "../../components/shop/CartItems";
import MainButton from "../../components/MainButton";
import * as orderActions from "../../store/action/order";
import { currentDateTime } from "../../helper/utility";
import { Color } from "../../constants/Color";

const CartScreen = (props) => {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const cart = useSelector((state) => state.cart.cartItems);
    const totalSum = useSelector((state) => state.cart.totalSum);

    useEffect(() => {
        if (error) {
            Alert.alert("Error", error, [{ Text: "Ok", style: "destructive" }]);
        }
    }, [error]);

    const dispatch = useDispatch();
    const checkOutHandler = async () => {
        const updatedCart = [];
        cart.forEach((item) => {
            updatedCart.push({ ...item, orderDate: currentDateTime() });
        });
        setError();
        setIsLoading(true);
        try {
            await dispatch(orderActions.placeOrder(updatedCart));
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
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
                {isLoading ? (
                    <ActivityIndicator size='small' color={Color.primary} />
                ) : (
                    <MainButton onPress={checkOutHandler}>Check out</MainButton>
                )}
            </View>
        </View>
    );
};
export const ScreenOptions = (navData) => {
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
