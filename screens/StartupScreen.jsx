import React, { useEffect } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    AsyncStorage,
} from "react-native";
import { Color } from "../constants/Color";
import { useDispatch } from "react-redux";
import * as authActions from "../store/action/Auth";

const StartupScreen = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem("userData");
            if (!userData) {
                props.navigation.navigate("auth");
                return;
            }

            const transformedData = JSON.parse(userData);
            const { token, userId, expiryDate } = transformedData;

            const expirationDate = new Date(expiryDate);
            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate("auth");
                return;
            }
            const expirationTime =
                expirationDate.getTime() - new Date().getTime();
            props.navigation.navigate("shop");
            dispatch(authActions.authinticate(userId, token, expirationTime));
        };
        tryLogin();
    }, []);
    return (
        <View style={styles.centerd}>
            <ActivityIndicator size='large' color={Color.primary} />
        </View>
    );
};

const styles = StyleSheet.create({
    centerd: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default StartupScreen;
