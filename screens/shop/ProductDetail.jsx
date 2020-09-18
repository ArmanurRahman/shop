import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    Button,
} from "react-native";
import { useSelector } from "react-redux";
import { Color } from "../../constants/Color";
import { Ionicons } from "@expo/vector-icons";
import MainButton from "../../components/MainButton";

const ProductDetails = (props) => {
    const [quantity, setQuantity] = useState(1);
    const selectProductId = props.navigation.getParam("productId");
    const availableProduct = useSelector(
        (state) => state.product.availableProducts
    );
    const selectedProduct = availableProduct.find(
        (product) => product.id === selectProductId
    );
    console.log(selectedProduct);
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
                    <View style={styles.quantityTotal}>
                        <View style={styles.quantity}>
                            <MainButton>
                                <Ionicons
                                    name='md-remove'
                                    size={24}
                                    color='white'
                                />
                            </MainButton>
                            <View>
                                <Text style={{ fontSize: 18 }}>
                                    {String(quantity).padStart(2, "0")}
                                </Text>
                            </View>

                            <MainButton>
                                <Ionicons
                                    name='md-add'
                                    size={24}
                                    color='white'
                                />
                            </MainButton>
                        </View>
                        <View styles={styles.total}>
                            <Text>Total</Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <MainButton>
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

ProductDetails.navigationOptions = (navData) => {
    const productTitle = navData.navigation.getParam("productTitle");
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
    quantity: {
        flexDirection: "row",
        alignItems: "center",
        width: "40%",
        justifyContent: "space-between",
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
    buttonContainer: {
        marginTop: 16,
        width: "70%",
        alignSelf: "center",
    },
});

export default ProductDetails;
