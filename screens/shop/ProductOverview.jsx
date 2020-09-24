import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ProductList from "../../components/ProductList";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";

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
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='menu'
                    iconName='ios-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='cart'
                    iconName='ios-cart'
                    onPress={() => {
                        navData.navigation.navigate("cartScreen");
                    }}
                />
            </HeaderButtons>
        ),
    };
};
const styles = StyleSheet.create({});

export default ProductOverview;
