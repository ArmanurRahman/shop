import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
} from "react-native";

const ProductList = (props) => {
    let TouchableComponent = TouchableOpacity;

    if (Platform.OS == "android" && Platform.Version > 22) {
        TouchableComponent = TouchableNativeFeedback;
    }

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <TouchableComponent
                    onPress={() =>
                        props.onSelectItem(props.item.id, props.item.title)
                    }
                    useForeground
                >
                    <View>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: props.item.imageUrl }}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.detailContainer}>
                            <View>
                                <Text style={styles.title}>
                                    {props.item.title}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.price}>
                                    {props.item.price}
                                </Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                {props.children}
                            </View>
                        </View>
                    </View>
                </TouchableComponent>
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
