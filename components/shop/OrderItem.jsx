import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const CartItem = (props) => {
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
                    <Text> Order Date: {props.orderDate}</Text>
                    <View style={{ alignItems: "flex-end", marginRight: 10 }}>
                        <Text> QUANTITY: {props.quantity}</Text>
                        <Text> PRICE: {props.price}</Text>
                        <Text> TOTAL PRICE: {props.totalPrice}</Text>
                    </View>
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
        marginVertical: 15,
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
