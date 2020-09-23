import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import QuantityControl from "../QuantityControl/QuantityControl";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import * as cartAction from "../../store/action/cart";

const CartItem = (props) => {
    const [quantity, setQuantity] = useState();
    const quantityHandler = (qty) => {
        setQuantity(qty);
    };

    const dispatch = useDispatch();
    const removeCart = () => {
        dispatch(cartAction.removeFromCart(props.id));
    };

    const cartInfo = useSelector((state) => {
        return state.cart.cartItems.find((item) => item.productId === props.id);
    });

    useEffect(() => {
        setQuantity(cartInfo ? cartInfo.quantity : 1);
    }, []);

    return (
        <View>
            <View style={styles.cart}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: props.imageUrl }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.detailContainer}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={styles.title}>{props.title}</Text>
                        <TouchableOpacity onPress={removeCart}>
                            <Ionicons name='md-trash' size={24} color='red' />
                        </TouchableOpacity>
                    </View>
                    <QuantityControl
                        selectProductId={props.id}
                        unitPrice={props.price}
                        onSetQuantity={quantityHandler}
                    />
                </View>
            </View>

            <View style={styles.line}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    cart: {
        width: "100%",
        flexDirection: "row",
    },
    imageContainer: {
        width: "30%",
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 25,
    },
    detailContainer: {
        width: "70%",
        marginVertical: 10,
        justifyContent: "space-between",
    },
    title: {
        fontSize: 18,
    },

    line: {
        width: "100%",
        height: 2,
        backgroundColor: "#cfcfcf",
    },
});

export default CartItem;
