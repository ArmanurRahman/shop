import {
    ADD_TO_CART,
    ADD_QUANTITY,
    DEDUCT_QUANTITY,
    REMOVE_FROM_CART,
} from "../action/cart";
import { PLACE_ORDER } from "../action/order";
import Cart from "../../models/cart";
import { DELETE_PRODUCT } from "../action/product";

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
                    "u1",
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
                    cloneCart[index].userId,
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

        case REMOVE_FROM_CART:
            const productIndex = state.cartItems.findIndex(
                (item) => item.productId === action.productId
            );
            let cloneCart = [...state.cartItems];
            const removed = cloneCart.splice(productIndex, 1);

            return {
                ...state,
                cartItems: cloneCart,
                totalSum: (state.totalSum - removed[0].totalPrice).toFixed(2),
            };
        case PLACE_ORDER:
            return {
                ...state,
                cartItems: [],
                totalSum: 0,
            };
        case DELETE_PRODUCT:
            const cartProductIndex = state.cartItems.findIndex(
                (item) => item.productId === action.pid
            );
            if (cartProductIndex === -1) {
                return state;
            }
            let cloneCartItem = [...state.cartItems];
            const removedItem = cloneCartItem.splice(cartProductIndex, 1);

            return {
                ...state,
                cartItems: cloneCartItem,
                totalSum: (state.totalSum - removedItem[0].totalPrice).toFixed(
                    2
                ),
            };
        default:
            return state;
    }
};

export default reducer;
