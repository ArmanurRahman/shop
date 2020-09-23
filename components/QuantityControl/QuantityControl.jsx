import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MainButton from "../MainButton";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const QuantityControl = (props) => {
    const [quantity, setQuantity] = useState();
    const [totalPrice, setTotalPrice] = useState(0);

    const cartInfo = useSelector((state) => {
        return state.cart.cartItems.find(
            (item) => item.productId === props.selectProductId
        );
    });

    useEffect(() => {
        setQuantity(cartInfo ? cartInfo.quantity : 1);
        setTotalPrice(cartInfo ? cartInfo.totalPrice : props.unitPrice);
    }, []);

    const addQuantity = () => {
        const tPrice = props.unitPrice * (quantity + 1);
        let qty = quantity + 1;
        setQuantity(qty);
        setTotalPrice(tPrice);
        props.onSetQuantity(qty);
    };

    const removeQuantity = () => {
        if (quantity !== 1) {
            const tPrice = props.unitPrice * (quantity - 1);
            let qty = quantity - 1;
            setQuantity(qty);
            setTotalPrice(tPrice);
            props.onSetQuantity(qty);
        }
    };

    return (
        <View style={styles.quantityTotal}>
            <View style={styles.quantity}>
                <MainButton onPress={removeQuantity}>
                    <Ionicons name='md-remove' size={24} color='white' />
                </MainButton>
                <View>
                    <Text style={{ fontSize: 18 }}>
                        {String(quantity).padStart(2, "0")}
                    </Text>
                </View>

                <MainButton onPress={addQuantity}>
                    <Ionicons name='md-add' size={24} color='white' />
                </MainButton>
            </View>
            <View styles={styles.total}>
                <Text style={{ fontSize: 18 }}>
                    Total ${totalPrice.toFixed(2)}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    quantity: {
        flexDirection: "row",
        alignItems: "center",
        width: "60%",
        justifyContent: "space-around",
    },
    total: {
        width: "40%",
    },
    quantityTotal: {
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});

export default QuantityControl;
