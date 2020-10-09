import React from "react";
import { useSelector } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";

import { ShopNavigator, AuthNavigator } from "./ShopNavigation";
import StartupScreen from "../screens/StartupScreen";

const AppNavigation = (props) => {
    const isAuth = useSelector((state) => !!state.auth.token);
    const tryAutoLogin = useSelector((state) => !!state.auth.tryAutoLogin);

    return (
        <NavigationContainer>
            {isAuth && <ShopNavigator />}
            {!isAuth && tryAutoLogin && <AuthNavigator />}
            {!isAuth && !tryAutoLogin && <StartupScreen />}
        </NavigationContainer>
    );
};

export default AppNavigation;
