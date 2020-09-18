import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ProductItem from "./ProductItem";

const ProductList = (props) => {
    const renderItem = (itemData) => {
        return (
            <ProductItem
                imageUrl={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
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
