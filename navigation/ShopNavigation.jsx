import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    createDrawerNavigator,
    DrawerItemList,
} from "@react-navigation/drawer";
import ProductOverview, {
    ScreenOptions as ProductOverviewScreenOptions,
} from "../screens/shop/ProductOverview";
import { createAppContainer } from "react-navigation";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Color } from "../constants/Color";
import ProductDetails, {
    ScreenOptions as ProductDetailsScreenOption,
} from "../screens/shop/ProductDetail";
import CartScreen, {
    ScreenOptions as CartScreenOption,
} from "../screens/shop/CartScreen";
import OrderScreen, {
    ScreenOptions as OrderScreenOption,
} from "../screens/shop/OrdersScreen";

import { Ionicons } from "@expo/vector-icons";
import UserProductScreen, {
    ScreenOptions as UserProductScreenOption,
} from "../screens/user/userProduct";
import EditProductScreen, {
    ScreenOptions as EditProductScreenOption,
} from "../screens/user/EditProduct";
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

const ProductStackNavigator = createStackNavigator();

export const ProductNavigator = () => {
    return (
        <ProductStackNavigator.Navigator
            screenOptions={defaultNavigationHeader}
        >
            <ProductStackNavigator.Screen
                name='productOverview'
                component={ProductOverview}
                options={ProductOverviewScreenOptions}
            />
            <ProductStackNavigator.Screen
                name='productDetail'
                component={ProductDetails}
                options={ProductDetailsScreenOption}
            />
            <ProductStackNavigator.Screen
                name='cartScreen'
                component={CartScreen}
                options={CartScreenOption}
            />
        </ProductStackNavigator.Navigator>
    );
};

const UserStackNavigator = createStackNavigator();

export const UserNavigator = () => {
    return (
        <UserStackNavigator.Navigator screenOptions={defaultNavigationHeader}>
            <UserStackNavigator.Screen
                name='userProducts'
                component={UserProductScreen}
                options={UserProductScreenOption}
            />
            <UserStackNavigator.Screen
                name='userEdit'
                component={EditProductScreen}
                options={EditProductScreenOption}
            />
        </UserStackNavigator.Navigator>
    );
};

const OrderStackNavigator = createStackNavigator();

export const OrderNavigator = () => {
    return (
        <OrderStackNavigator.Navigator screenOptions={defaultNavigationHeader}>
            <OrderStackNavigator.Screen
                name='orderScreen'
                component={OrderScreen}
                options={OrderScreenOption}
            />
        </OrderStackNavigator.Navigator>
    );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen name='auth' component={Auth} />
        </AuthStackNavigator.Navigator>
    );
};
const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    const dispatch = useDispatch();
    return (
        <ShopDrawerNavigator.Navigator
            drawerContent={(props) => {
                return (
                    <View style={{ flex: 1, paddingTop: 20 }}>
                        <SafeAreaView
                            forceInset={{ top: "always", horizontal: "never" }}
                        >
                            <DrawerItemList {...props} />
                            <Button
                                title='Logout'
                                color={props.color}
                                onPress={() => {
                                    dispatch(authActions.logout());
                                    //props.navigation.navigate("auth");
                                }}
                            />
                        </SafeAreaView>
                    </View>
                );
            }}
            drawerContentOptions={{
                activeTintColor: Color.primary,
            }}
        >
            <ShopDrawerNavigator.Screen
                name='shopNav'
                component={ProductNavigator}
                options={{
                    drawerIcon: (props) => (
                        <Ionicons
                            name='ios-home'
                            size={23}
                            color={props.color}
                        />
                    ),
                    drawerLabel: "Shop",
                }}
            />
            <ShopDrawerNavigator.Screen
                name='orderNav'
                component={OrderNavigator}
                options={{
                    drawerIcon: (props) => (
                        <Ionicons
                            name='ios-list'
                            size={23}
                            color={props.color}
                        />
                    ),
                    drawerLabel: "Order",
                }}
            />
            <ShopDrawerNavigator.Screen
                name='userNav'
                component={UserNavigator}
                options={{
                    drawerIcon: (props) => (
                        <Ionicons
                            name='ios-contact'
                            size={23}
                            color={props.color}
                        />
                    ),
                    drawerLabel: "Admin",
                }}
            />
        </ShopDrawerNavigator.Navigator>
    );
};
/*
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
                                //props.navigation.navigate("auth");
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
*/
