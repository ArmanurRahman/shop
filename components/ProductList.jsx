import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ProductItem from "./ProductItem";
import { useDispatch } from "react-redux";
import * as cartActions from "../store/action/cart";

const ProductList = (props) => {
    const dispatch = useDispatch();
    const addToCartHandler = () => {
        dispatch(cartActions.addToCart(props.data, 1));
        console.log("in");
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
            <ProductItem
                id={itemData.item.id}
                imageUrl={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelectItem={selectItemHander}
                addToCart={addToCartHandler}
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
