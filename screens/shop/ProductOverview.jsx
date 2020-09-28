import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductList from "../../components/ProductList";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import * as productActions from "../../store/action/product";

const ProductOverview = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(productActions.fetchProducts());
    }, [dispatch]);

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
