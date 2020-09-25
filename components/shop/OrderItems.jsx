import React from "react";
import { FlatList } from "react-native";
import OrderItem from "./OrderItem";

const CartItems = (props) => {
    console.log(props.data);
    const renderItem = (renderData) => {
        return (
            <OrderItem
                id={renderData.item.productId}
                imageUrl={renderData.item.imageUrl}
                title={renderData.item.title}
                totalPrice={renderData.item.totalPrice}
                quantity={renderData.item.quantity}
                price={renderData.item.price}
                orderDate={renderData.item.orderDate}
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
