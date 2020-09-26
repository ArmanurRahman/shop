import PRODUCTS from "../../constants/dummy-data";
import { DELETE_PRODUCT } from "../action/product";

const init = {
    availableProducts: PRODUCTS,
    userProduct: PRODUCTS.filter((item) => item.userId === "u1"),
};

const reducer = (state = init, action) => {
    switch (action.type) {
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
