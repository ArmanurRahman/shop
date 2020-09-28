import PRODUCTS from "../../constants/dummy-data";
import {
    DELETE_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    SET_PRODUCT,
} from "../action/product";
import Product from "../../models/product";

const init = {
    availableProducts: PRODUCTS,
    userProduct: PRODUCTS.filter((item) => item.userId === "u1"),
};

const reducer = (state = init, action) => {
    switch (action.type) {
        case SET_PRODUCT:
            return {
                ...state,
                availableProducts: action.products,
                userProduct: action.products.filter(
                    (item) => item.userId === "u1"
                ),
            };
        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.id,
                "u1",
                action.title,
                action.imageUrl,
                action.description,
                action.price
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProduct: state.userProduct.concat(newProduct),
            };
        case UPDATE_PRODUCT:
            const productIndex = state.userProduct.findIndex(
                (item) => item.id === action.productId
            );
            const updateProduct = new Product(
                action.productId,
                state.userProduct[productIndex].userId,
                action.title,
                action.imageUrl,
                action.description,
                state.userProduct[productIndex].price
            );

            const updateUserProduct = [...state.userProduct];
            updateUserProduct[productIndex] = updateProduct;
            const availableProductIndex = state.availableProducts.findIndex(
                (item) => item.id === action.productId
            );
            const updateAvailableProduct = [...state.availableProducts];
            updateAvailableProduct[availableProductIndex] = updateProduct;
            return {
                ...state,
                availableProducts: updateAvailableProduct,
                userProduct: updateUserProduct,
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                userProduct: state.userProduct.filter(
                    (product) => product.id !== action.pid
                ),
                availableProducts: state.availableProducts.filter(
                    (product) => product.id !== action.pid
                ),
            };
    }
    return state;
};

export default reducer;
