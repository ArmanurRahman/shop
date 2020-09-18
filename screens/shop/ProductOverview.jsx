import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ProductList from "../../components/ProductList";

const ProductOverview = (props) => {
    const availableProducts = useSelector(
        (state) => state.product.availableProducts
    );
    console.log(availableProducts);
    return <ProductList data={availableProducts} />;
};

ProductOverview.navigationOptions = (navData) => {
    return {
        headerTitle: "Products",
    };
};
const styles = StyleSheet.create({});

export default ProductOverview;
