import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import QuantityControl from "../QuantityControl/QuantityControl";
import { useSelector } from "react-redux";

const CartItem = (props) => {
    const [quantity, setQuantity] = useState();
    const quantityHandler = (qty) => {
        setQuantity(qty);
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
                    <View>
                        <Text style={styles.title}>{props.title}</Text>
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
    price: {
        fontSize: 18,
    },
    line: {
        width: "100%",
        height: 2,
        backgroundColor: "#cfcfcf",
    },
});

export default CartItem;
