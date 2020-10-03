import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ShopNavigation from "./ShopNavigation";
import { NavigationActions } from "react-navigation";

const NavigationContainer = (props) => {
    const navRef = useRef();
    const isAuth = useSelector((state) => !!state.auth.token);

    useEffect(() => {
        if (!isAuth) {
            navRef.current.dispatch(
                NavigationActions.navigate({ routeName: "auth" })
            );
        }
    }, [isAuth]);
    return <ShopNavigation ref={navRef} />;
};

export default NavigationContainer;
