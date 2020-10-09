import React, { useState, useEffect, useReducer, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Text,
} from "react-native";
import Input from "../../components/UI/input";
import MainButton from "../../components/MainButton";
import { Color } from "../../constants/Color";
import * as authActions from "../../store/action/Auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updateInputValues = { ...state.inputValues };
        updateInputValues[action.input] = action.value;
        const updateInputValidities = { ...state.inputValidities };
        updateInputValidities[action.input] = action.isValid;
        let updatedFormIsValid = true;
        for (const key in updateInputValidities) {
            updatedFormIsValid =
                updatedFormIsValid && updateInputValidities[key];
        }
        return {
            ...state,
            inputValues: updateInputValues,
            inputValidities: updateInputValidities,
            formIsValid: updatedFormIsValid,
        };
    }
    return state;
};

const Auth = (props) => {
    const [isSignup, setIsSignup] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: "",
            password: "",
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false,
    });
    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier,
            });
        },
        [dispatchFormState]
    );

    useEffect(() => {
        if (error) {
            Alert.alert("Error", error, [{ Text: "Ok" }]);
        }
    }, [error]);

    const authHandler = async () => {
        let action;
        if (isSignup) {
            action = authActions.login(
                formState.inputValues.email,
                formState.inputValues.password
            );
        } else {
            action = authActions.signUp(
                formState.inputValues.email,
                formState.inputValues.password
            );
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            //props.navigation.navigate("shop");
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };
    return (
        <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={20}
            style={styles.screen}
        >
            <View style={styles.controls}>
                <ScrollView>
                    <View>
                        <Input
                            id='email'
                            label='E-mail'
                            errorText='Please enter valid email'
                            keyboardType='default'
                            autoCapitalize='none'
                            returnKeyType='next'
                            initailValue={formState.inputValues.email}
                            initailValid={formState.inputValidities.email}
                            onInputChange={inputChangeHandler}
                            required
                            email
                        />

                        <Input
                            id='password'
                            label='Password'
                            errorText='Please enter valid password'
                            keyboardType='default'
                            autoCapitalize='none'
                            returnKeyType='next'
                            initailValue={formState.inputValues.password}
                            initailValid={formState.inputValidities.email}
                            onInputChange={inputChangeHandler}
                            required
                            secureTextEntry
                        />
                        {isLoading ? (
                            <ActivityIndicator
                                size='small'
                                color={Color.primary}
                            />
                        ) : (
                            <MainButton
                                styles={{
                                    marginTop: 10,
                                }}
                                onPress={authHandler}
                            >
                                {isSignup ? "LogIn" : "SignUp"}
                            </MainButton>
                        )}

                        <MainButton
                            styles={{
                                backgroundColor: Color.secondary,
                                marginTop: 10,
                            }}
                            onPress={() => {
                                setIsSignup((prevState) => !prevState);
                            }}
                        >
                            {" "}
                            Switch to {!isSignup ? "LogIn" : "SignUp"}
                        </MainButton>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        width: "100%",
        height: "100%",
    },
    controls: {
        width: "80%",
    },
});

export default Auth;
