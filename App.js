import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ShopNavigation from "./navigation/ShopNavigation";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import ProductReducer from "./store/reducer/product";
import CartReducer from "./store/reducer/cart";

export default function App() {
    const rootReducer = combineReducers({
        product: ProductReducer,
        cart: CartReducer,
    });

    const store = createStore(rootReducer);
    return (
        <Provider store={store}>
            <ShopNavigation />
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
