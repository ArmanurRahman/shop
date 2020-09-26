import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ProductItem from "./ProductItem";
import { useDispatch } from "react-redux";
import MainButton from "./MainButton";
import * as productActions from "../store/action/product";

const UserProductList = (props) => {
    const dispatch = useDispatch();
    const deleteHandler = (id) => {
        dispatch(productActions.deleteProduct(id));
    };

    const selectItemHander = (id, title) => {
        props.navigation.navigate({
            routeName: "productDetail",
            params: {
                productId: id,
                productTitle: title,
            },
        });
    };

    const renderItem = (itemData) => {
        return (
            <ProductItem onSelectItem={selectItemHander} item={itemData.item}>
                <MainButton onPress={() => {}}>EDIT</MainButton>

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
