import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Alert,
    ActivityIndicator,
} from "react-native";
import ProductItem from "./ProductItem";
import { useDispatch } from "react-redux";
import MainButton from "./MainButton";
import * as productActions from "../store/action/product";
import { Color } from "../constants/Color";

const UserProductList = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        Alert.alert("Are you sure?", "Do you really want to delete this item", [
            { text: "No", style: "default" },
            {
                text: "Yes",
                style: "destructive",
                onPress: async () => {
                    setIsLoading(true);
                    setError(null);
                    try {
                        await dispatch(productActions.deleteProduct(id));
                    } catch (err) {
                        setError(err.message);
                    }
                    setIsLoading(false);
                },
            },
        ]);
    };

    const selectItemHander = (id) => {
        props.navigation.navigate("userEdit", {
            productId: id,
        });
    };
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Color.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>{error}</Text>
            </View>
        );
    }
    const renderItem = (itemData) => {
        return (
            <ProductItem
                onSelectItem={() => selectItemHander(itemData.item.id)}
                item={itemData.item}
            >
                <MainButton onPress={() => selectItemHander(itemData.item.id)}>
                    EDIT
                </MainButton>

                <MainButton
                    onPress={() => {
                        deleteHandler(itemData.item.id);
                    }}
                >
                    DELETE
                </MainButton>
            </ProductItem>
        );
    };

    return (
        <FlatList
            data={props.data}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id}
        />
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
export default UserProductList;
