import React from "react";
import { FlatList } from "react-native";
import OrderItem from "./OrderItem";

const CartItems = (props) => {
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
            keyExtractor={(item, index) => item.orderId}
            renderItem={renderItem}
        />
    );
};

export default CartItems;
