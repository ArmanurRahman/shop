import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import ProductOverview from "../screens/shop/ProductOverview";
import { createAppContainer } from "react-navigation";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Color } from "../constants/Color";
import ProductDetails from "../screens/shop/ProductDetail";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrdersScreen";
import {
    createDrawerNavigator,
    DrawerNavigatorItems,
} from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import UserProductScreen from "../screens/user/userProduct";
import EditProductScreen from "../screens/user/EditProduct";
import { createSwitchNavigator } from "react-navigation";
import Auth from "../screens/user/Auth";
import StartupScreen from "../screens/StartupScreen";
import { useDispatch } from "react-redux";
import * as authActions from "../store/action/Auth";

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
        userEdit: EditProductScreen,
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

const authNavigation = createStackNavigator(
    {
        auth: Auth,
    },
    {
        defaultNavigationOptions: defaultNavigationHeader,
    }
);

const ShopDrawerNavigation = createDrawerNavigator(
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
        contentComponent: (props) => {
            const dispatch = useDispatch();
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <SafeAreaView
                        forceInset={{ top: "always", horizontal: "never" }}
                    >
                        <DrawerNavigatorItems {...props} />
                        <Button
                            title='Logout'
                            color={Color.secondary}
                            onPress={() => {
                                dispatch(authActions.logout());
                                props.navigation.navigate("auth");
                            }}
                        />
                    </SafeAreaView>
                </View>
            );
        },
    }
);
const MainNavigator = createSwitchNavigator({
    startup: StartupScreen,
    auth: authNavigation,
    shop: ShopDrawerNavigation,
});
export default createAppContainer(MainNavigator);
