import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ProductItem from "./ProductItem";
import { useDispatch } from "react-redux";
import MainButton from "./MainButton";
import * as cartActions from "../store/action/cart";

const ProductList = (props) => {
    const dispatch = useDispatch();
    const addToCartHandler = (item) => {
        dispatch(cartActions.addToCart(item, 1));
    };

    const selectItemHander = (id, title) => {
        props.navigation.navigate("productDetail", {
            productId: id,
            productTitle: title,
        });
    };

    const renderItem = (itemData) => {
        return (
            <ProductItem onSelectItem={selectItemHander} item={itemData.item}>
                <MainButton
                    onPress={() =>
                        selectItemHander(itemData.item.id, itemData.item.title)
                    }
                >
                    VIEW DETAIL
                </MainButton>

                <MainButton onPress={() => addToCartHandler(itemData.item)}>
                    TO CART
                </MainButton>
            </ProductItem>
        );
    };

    return (
        <FlatList
            onRefresh={props.onRefresh}
            refreshing={props.refreshing}
            data={props.data}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id}
        />
    );
};

const styles = StyleSheet.create({});
export default ProductList;
