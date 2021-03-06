import React from "react";
import { StyleSheet } from "react-native";
import NavigationContainer from "./navigation/NavigationContainer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ProductReducer from "./store/reducer/product";
import CartReducer from "./store/reducer/cart";
import OrderReducer from "./store/reducer/order";
import AuthReducer from "./store/reducer/auth";
import thunk from "redux-thunk";

export default function App() {
    const rootReducer = combineReducers({
        product: ProductReducer,
        cart: CartReducer,
        order: OrderReducer,
        auth: AuthReducer,
    });

    const store = createStore(rootReducer, applyMiddleware(thunk));

    return (
        <Provider store={store}>
            <NavigationContainer />
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
