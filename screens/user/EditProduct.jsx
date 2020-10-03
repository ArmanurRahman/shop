import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { useSelector } from "react-redux";
import * as productActions from "../../store/action/product";
import { useDispatch } from "react-redux";
import Input from "../../components/UI/input";
import { Color } from "../../constants/Color";

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
const EditProductScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const productId = props.navigation.getParam("productId");

    const editProduct = useSelector((state) =>
        state.product.userProduct.find((prod) => prod.id === productId)
    );
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editProduct ? editProduct.title : "",
            imageUrl: editProduct ? editProduct.imageUrl : "",
            description: editProduct ? editProduct.description : "",
            price: "",
        },
        inputValidities: {
            title: editProduct ? true : false,
            imageUrl: editProduct ? true : false,
            description: editProduct ? true : false,
            price: editProduct ? true : false,
        },
        formIsValid: editProduct ? true : false,
    });

    const dispatch = useDispatch();

    const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert("Wrong input", "Please check error in the form", [
                { text: "Ok" },
            ]);
            return;
        }

        setError(null);
        setIsLoading(true);
        try {
            if (!editProduct) {
                await dispatch(
                    productActions.createProduct(
                        formState.inputValues.title,
                        formState.inputValues.imageUrl,
                        formState.inputValues.price,
                        formState.inputValues.description
                    )
                );
            } else {
                await dispatch(
                    productActions.updateProduct(
                        editProduct.id,
                        formState.inputValues.title,
                        formState.inputValues.imageUrl,
                        formState.inputValues.description
                    )
                );
            }
            props.navigation.goBack();
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

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

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Color.primary} />
            </View>
        );
    }
    if (error) {
        return (
            <View style={styles.centered}>
                <Text>{error}</Text>
            </View>
        );
    }
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior='padding'
            keyboardVerticalOffset={20}
        >
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='title'
                        label='Title'
                        errorText='Please enter valid title'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        initailValue={editProduct ? editProduct.title : ""}
                        initailValid={!!editProduct}
                        onInputChange={inputChangeHandler}
                        required
                    />
                    <Input
                        id='imageUrl'
                        label='Image Url'
                        errorText='Please enter valid Image Url'
                        keyboardType='default'
                        initailValue={editProduct ? editProduct.imageUrl : ""}
                        initailValid={!!editProduct}
                        returnKeyType='next'
                        required
                        onInputChange={inputChangeHandler}
                    />
                    {!editProduct && (
                        <Input
                            id='price'
                            label='Price'
                            errorText='Please enter valid price'
                            keyboardType='decimal-pad'
                            returnKeyType='next'
                            required
                            min={0.1}
                            onInputChange={inputChangeHandler}
                        />
                    )}

                    <Input
                        id='description'
                        label='Description'
                        errorText='Please enter valid description'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        initailValue={
                            editProduct ? editProduct.description : ""
                        }
                        initailValid={!!editProduct}
                        required
                        minLength={5}
                        onInputChange={inputChangeHandler}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

EditProductScreen.navigationOptions = (navData) => {
    const submitFunc = navData.navigation.getParam("submit");
    return {
        headerTitle: navData.navigation.getParam("productId")
            ? "Edit Product"
            : "Add Product",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='save'
                    iconName='ios-checkmark'
                    onPress={submitFunc}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default EditProductScreen;
