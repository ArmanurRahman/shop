import React from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
} from "react-native";
import { Color } from "../constants/Color";

const MainButton = (props) => {
    let ButtonComponent = TouchableOpacity;
    if (Platform.OS === "android" && Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }
    return (
        <View style={styles.buttonContainer}>
            <ButtonComponent activeOpacity={0.7} onPress={props.onPress}>
                <View style={{ ...styles.button, ...props.styles }}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </ButtonComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Color.primary,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    buttonText: {
        color: "white",
        fontSize: 14,
        textAlign: "center",
    },
    buttonContainer: {
        borderRadius: 15,
        overflow: "hidden",
    },
});

export default MainButton;
