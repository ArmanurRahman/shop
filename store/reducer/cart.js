import { ADD_TO_CART, ADD_QUANTITY, DEDUCT_QUANTITY } from "../action/cart";
import Cart from "../../models/cart";

const init = {
    cartItems: [],
    totalSum: 0,
};

const reducer = (state = init, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const index = state.cartItems.findIndex(
                (item) => item.productId === action.product.id
            );
            let newCartItems = [...state.cartItems];
            let total = state.totalSum;
            if (index === -1) {
                const newCart = new Cart(
                    action.product.id,
                    action.product.title,
                    action.product.imageUrl,
                    action.quantity,
                    action.quantity * action.product.price,
                    action.product.price
                );
                newCartItems.push(newCart);
                total += action.quantity * action.product.price;
            } else {
                let cloneCart = [...state.cartItems];
                cloneCart[index] = new Cart(
                    action.product.id,
                    action.product.title,
                    action.product.imageUrl,
                    cloneCart[index].quantity + 1,
                    cloneCart[index].totalPrice + action.product.price,
                    action.product.price
                );
                newCartItems = cloneCart;
                total += action.product.price;
            }
            return {
                ...state,
                cartItems: newCartItems,
                totalSum: total,
            };
        case ADD_QUANTITY:
            const productIndex = state.cartItems.findIndex(
                (item) => item.productId === action.productId
            );
            if (productIndex !== 0) {
                let cloneCart = [...state.cartItems];
                cloneCart[index] = new Cart(
                    cloneCart[index].productId,
                    cloneCart[index].title,
                    cloneCart[index].imageUrl,
                    cloneCart[index].quantity + 1,
                    cloneCart[index].totalPrice + action.price
                );
                newCartItems = cloneCart;
                total += action.price;
            }
            return {
                ...state,
                cartItems: newCartItems,
                totalSum: total,
            };
        default:
            return state;
    }
};

export default reducer;
