export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_QUANTITY = "ADD_QUANTITY";
export const DEDUCT_QUANTITY = "DEDUCT_QUANTITY";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const addToCart = (product, quantity) => {
    return {
        type: ADD_TO_CART,
        product: product,
        quantity: quantity,
    };
};

export const removeFromCart = (productId) => {
    return {
        type: REMOVE_FROM_CART,
        productId,
    };
};

export const addQuatity = (productId, price) => {
    return {
        type: ADD_QUANTITY,
        productId,
        price,
    };
};

export const deductQuatity = (productId, price) => {
    return {
        type: DEDUCT_QUANTITY,
        productId,
        price,
    };
};
