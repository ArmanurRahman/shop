import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Color } from "../../constants/Color";
import { Ionicons } from "@expo/vector-icons";
import MainButton from "../../components/MainButton";
import QuantityControl from "../../components/QuantityControl/QuantityControl";
import * as cartActions from "../../store/action/cart";

const ProductDetails = (props) => {
    const selectProductId = props.route.params.productId;
    const [quantity, setQuantity] = useState();

    const availableProduct = useSelector(
        (state) => state.product.availableProducts
    );

    const selectedProduct = availableProduct.find(
        (product) => product.id === selectProductId
    );

    const dispatch = useDispatch();

    const quantityHandler = (qty) => {
        setQuantity(qty);
    };

    const cartInfo = useSelector((state) => {
        return state.cart.cartItems.find(
            (item) => item.productId === selectProductId
        );
    });

    useEffect(() => {
        setQuantity(cartInfo ? cartInfo.quantity : 1);
    }, []);

    const addToCartHandler = () => {
        dispatch(cartActions.addToCart(selectedProduct, quantity));
    };
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: selectedProduct.imageUrl }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.detailContainer}>
                    <View style={styles.titlePrice}>
                        <View>
                            <Text style={styles.title}>
                                {selectedProduct.title}
                            </Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={{ color: Color.primary }}>$</Text>
                            <Text style={styles.price}>
                                {selectedProduct.price}
                            </Text>
                        </View>
                    </View>
                    <Text
                        style={{
                            color: Color.primary,
                            fontSize: 20,
                            marginTop: 16,
                        }}
                    >
                        Details
                    </Text>
                    <Text style={{ color: "#819ca9" }}>
                        {" "}
                        {selectedProduct.description}
                    </Text>

                    <QuantityControl
                        selectProductId={selectProductId}
                        unitPrice={selectedProduct.price}
                        onSetQuantity={quantityHandler}
                    />

                    <View style={styles.buttonContainer}>
                        <MainButton onPress={addToCartHandler}>
                            <Ionicons
                                name='ios-basket'
                                size={24}
                                color='white'
                            />
                            {"   "}
                            Add To Cart
                        </MainButton>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export const ScreenOptions = (navData) => {
    const productTitle = navData.route.paramsproductTitle;
    return {
        headerTitle: productTitle,
    };
};
const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    imageContainer: {
        height: 300,
        borderRadius: 30,
        overflow: "hidden",
        margin: 15,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 1,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    detailContainer: {
        borderRadius: 15,
        overflow: "hidden",
        margin: 15,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 1,
        backgroundColor: "white",
        padding: 20,
    },
    titlePrice: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 20,
    },
    price: {
        fontSize: 24,
        color: Color.primary,
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    buttonContainer: {
        marginTop: 16,
        width: "70%",
        alignSelf: "center",
    },
});

export default ProductDetails;
