import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { useSelector } from "react-redux";
import * as productActions from "../../store/action/product";
import { useDispatch } from "react-redux";

const EditProductScreen = (props) => {
    const productId = props.navigation.getParam("productId");
    const editProduct = useSelector((state) =>
        state.product.userProduct.find((prod) => prod.id === productId)
    );

    const [title, setTitle] = useState(editProduct ? editProduct.title : "");
    const [imageUrl, setImageUrl] = useState(
        editProduct ? editProduct.imageUrl : ""
    );
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState(
        editProduct ? editProduct.description : ""
    );

    const dispatch = useDispatch();

    const submitHandler = useCallback(() => {
        if (!editProduct) {
            dispatch(
                productActions.createProduct(
                    title,
                    imageUrl,
                    price,
                    description
                )
            );
        } else {
            dispatch(
                productActions.updateProduct(
                    editProduct.id,
                    title,
                    imageUrl,
                    description
                )
            );
        }
        props.navigation.goBack();
    }, [dispatch, title, description, price, imageUrl]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                    ></TextInput>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={(text) => setImageUrl(text)}
                    ></TextInput>
                </View>
                {!editProduct && (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={price}
                            onChangeText={(text) => setPrice(text)}
                        ></TextInput>
                    </View>
                )}

                <View style={styles.formControl}>
                    <Text style={styles.label}> Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    ></TextInput>
                </View>
            </View>
        </ScrollView>
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
    formControl: {
        width: "100%",
    },
    label: {
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
});

export default EditProductScreen;
