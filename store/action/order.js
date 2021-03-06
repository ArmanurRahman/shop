export const PLACE_ORDER = "PLACE_ORDER";
export const SET_ORDERS = "SET_ORDERS";
import Orders from "../../models/Order";

export const placeOrder = (orderInfo) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const token = getState().auth.token;

        const response = await fetch(
            `https://simple-shop-9bc6f.firebaseio.com/orders/${userId}.json?auth=${token}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderInfo,
                }),
            }
        );

        if (!response.ok) {
            const errorRespose = await response.json();
            throw new Error(errorRespose.error);
        }
        const resData = await response.json();

        dispatch({
            type: PLACE_ORDER,
            orderInfo: {
                ...orderInfo,
                orderId: resData.name + orderInfo.orderId + orderInfo.orderDate,
            },
        });
    };
};

export const fetchOders = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
            const response = await fetch(
                `https://simple-shop-9bc6f.firebaseio.com/orders/${userId}.json`
            );

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error);
            }
            const resData = await response.json();

            const orderData = [];
            for (let key in resData) {
                resData[key].orderInfo.forEach((val, index) => {
                    orderData.push(
                        new Orders(
                            key + val.productId + val.orderDate,
                            val.title,
                            val.productId,
                            val.quantity,
                            val.price,
                            val.totalPrice,
                            val.imageUrl,
                            val.orderDate
                        )
                    );
                });
            }

            dispatch({ type: SET_ORDERS, orders: orderData });
        } catch (err) {
            throw err;
        }
    };
};
