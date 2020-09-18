import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ProductItem from "./ProductItem";

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
            <ProductItem
                id={itemData.item.id}
                imageUrl={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelectItem={selectItemHander}
            />
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
