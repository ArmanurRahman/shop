import { createStackNavigator } from "react-navigation-stack";
import ProductOverview from "../screens/shop/ProductOverview";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";
import { Color } from "../constants/Color";

const defaultNavigationHeader = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? Color.primary : "",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Color.primary,
};
const ShopNavigation = createStackNavigator(
    {
        productOverview: ProductOverview,
    },
    { defaultNavigationOptions: defaultNavigationHeader }
);

export default createAppContainer(ShopNavigation);
