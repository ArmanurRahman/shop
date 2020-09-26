import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import ProductOverview from "../screens/shop/ProductOverview";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";
import { Color } from "../constants/Color";
import ProductDetails from "../screens/shop/ProductDetail";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrdersScreen";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import UserProductScreen from "../screens/user/userProduct";

const defaultNavigationHeader = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? Color.primary : "",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Color.primary,
};
const ShopNavigation = createStackNavigator(
    {
        productOverview: ProductOverview,
        productDetail: ProductDetails,
        cartScreen: CartScreen,
    },
    {
        defaultNavigationOptions: defaultNavigationHeader,
        navigationOptions: {
            drawerIcon: (drawerConfig) => (
                <Ionicons
                    name='ios-home'
                    size={23}
                    color={drawerConfig.tintColor}
                />
            ),
        },
    }
);

const OderNavigation = createStackNavigator(
    {
        orderScreen: OrderScreen,
    },
    {
        defaultNavigationOptions: defaultNavigationHeader,
        navigationOptions: {
            drawerIcon: (drawerConfig) => (
                <Ionicons
                    name='ios-list'
                    size={23}
                    color={drawerConfig.tintColor}
                />
            ),
        },
    }
);

const UserNavigation = createStackNavigator(
    {
        userProducts: UserProductScreen,
    },
    {
        defaultNavigationOptions: defaultNavigationHeader,
        navigationOptions: {
            drawerIcon: (drawerConfig) => (
                <Ionicons
                    name='ios-contact'
                    size={23}
                    color={drawerConfig.tintColor}
                />
            ),
        },
    }
);
const mainNavigation = createDrawerNavigator(
    {
        shopNav: {
            screen: ShopNavigation,
            navigationOptions: {
                drawerLabel: "Shop",
            },
        },
        orderNav: {
            screen: OderNavigation,
            navigationOptions: {
                drawerLabel: "Oder",
            },
        },
        userNav: {
            screen: UserNavigation,
            navigationOptions: {
                drawerLabel: "User",
            },
        },
    },
    {
        contentOptions: {
            activeTintColor: Color.primary,
        },
    }
);
export default createAppContainer(mainNavigation);
