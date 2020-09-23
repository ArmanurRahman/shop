import React from "react";
import { FlatList } from "react-native";
import CartItem from "./CartItem";

const CartItems = (props) => {
    const renderItem = (renderData) => {
        return (
            <CartItem
                id={renderData.item.productId}
                imageUrl={renderData.item.imageUrl}
                title={renderData.item.title}
                totalPrice={renderData.item.totalPrice}
                quantity={renderData.item.quantity}
                price={renderData.item.price}
            />
        );
    };
    return (
        <FlatList
            data={props.data}
            keyExtractor={(item, index) => item.productId}
            renderItem={renderItem}
        />
    );
};

export default CartItems;
