import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ProductList from "../../components/ProductList";

const ProductOverview = (props) => {
    const availableProducts = useSelector(
        (state) => state.product.availableProducts
    );

    return (
        <ProductList data={availableProducts} navigation={props.navigation} />
    );
};

ProductOverview.navigationOptions = (navData) => {
    return {
        headerTitle: "Products",
    };
};
const styles = StyleSheet.create({});

export default ProductOverview;
