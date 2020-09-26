import React from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import ProductItem from "./ProductItem";
import { useDispatch } from "react-redux";
import MainButton from "./MainButton";
import * as productActions from "../store/action/product";

const UserProductList = (props) => {
    const dispatch = useDispatch();
    const deleteHandler = (id) => {
        Alert.alert("Are you sure?", "Do you really want to delete this item", [
            { text: "No", style: "default" },
            {
                text: "Yes",
                style: "destructive",
                onPress: () => {
                    dispatch(productActions.deleteProduct(id));
                },
            },
        ]);
    };

    const selectItemHander = (id) => {
        props.navigation.navigate({
            routeName: "userEdit",
            params: {
                productId: id,
            },
        });
    };

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

const styles = StyleSheet.create({});
export default UserProductList;
