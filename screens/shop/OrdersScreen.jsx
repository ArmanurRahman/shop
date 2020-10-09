import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useSelector } from "react-redux";
import OrderItems from "../../components/shop/OrderItems";
import * as OrderActions from "../../store/action/order";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { Color } from "../../constants/Color";

const OrderScreen = (props) => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const getOrders = useCallback(async () => {
        setIsLoading(true);
        setError();
        try {
            await dispatch(OrderActions.fetchOders());
        } catch (err) {
            setError(err.message);
        }

        setIsLoading(false);
    }, [dispatch]);

    useEffect(() => {
        props.navigation.addListener("willFocus", getOrders);
    }, [getOrders]);

    useEffect(() => {
        getOrders();
    }, [getOrders]);

    useEffect(() => {
        if (error) {
            Alert.alert("Error", error, [{ Text: "Ok", style: "destructive" }]);
        }
    }, [error]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Color.primary} />
            </View>
        );
    }
    return (
        <View>
            <OrderItems data={orders} />
        </View>
    );
};

export const ScreenOptions = (navData) => {
    return {
        headerTitle: "Orders",
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
    };
};
const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default OrderScreen;
