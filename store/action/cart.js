export const ADD_TO_CART = "ADD_TO_CART";

export const addToCart = (product, quantity) => {
    return {
        type: ADD_TO_CART,
        product: product,
        quantity: quantity,
    };
};
