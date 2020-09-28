import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductList from "../../components/ProductList";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import * as productActions from "../../store/action/product";
import { Color } from "../../constants/Color";
import MainButton from "../../components/MainButton";

const ProductOverview = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const loadProduct = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(productActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }

        setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        loadProduct();
    }, [loadProduct]);

    const availableProducts = useSelector(
        (state) => state.product.availableProducts
    );

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color={Color.primary} />
            </View>
        );
    }
    if (availableProducts.length === 0) {
        return (
            <View style={styles.container}>
                <Text> No Product found. May add some!</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text> Something went wrong!</Text>
                <MainButton onPress={loadProduct}> Try Again</MainButton>
            </View>
        );
    }

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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ProductOverview;
