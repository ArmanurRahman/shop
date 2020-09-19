import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ProductItem from "./ProductItem";
import { useDispatch } from "react-redux";

const ProductList = (props) => {
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
            <ProductItem onSelectItem={selectItemHander} item={itemData.item} />
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
export default ProductList;
