import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { Color } from "../constants/Color";

const ProductList = (props) => {
    return (
        <View style={styles.screen}>
            <View style={styles.container}>
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
                    <View>
                        <Text style={styles.price}>{props.price}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title='VIEW DETAIL' color={Color.primary} />
                        <Button title='TO CART' color={Color.primary} />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        width: "100%",
    },
    container: {
        margin: 15,
        height: 300,
        borderRadius: 15,
        overflow: "hidden",
        backgroundColor: "white",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 10,
    },
    imageContainer: {
        height: "60%",
    },
    detailContainer: {
        height: "40%",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    title: {
        textAlign: "center",
        fontSize: 20,
    },
    price: {
        textAlign: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 16,
    },
});

export default ProductList;
