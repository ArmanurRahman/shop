export const PLACE_ORDER = "PLACE_ORDER";

export const placeOrder = (orderInfo) => {
    return {
        type: PLACE_ORDER,
        orderInfo,
    };
};
