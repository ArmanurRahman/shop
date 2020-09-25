import { PLACE_ORDER } from "../action/order";

const init = {
    orders: [],
};

const reducer = (state = init, action) => {
    switch (action.type) {
        case PLACE_ORDER:
            const cloneOrder = [...state.orders];
            const newOrders = cloneOrder.concat(action.orderInfo);
            return {
                ...state,
                orders: newOrders,
            };
        default:
            return state;
    }
};
export default reducer;
