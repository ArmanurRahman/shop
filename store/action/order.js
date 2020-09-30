export const PLACE_ORDER = "PLACE_ORDER";
export const SET_ORDERS = "SET_ORDERS";
import Orders from "../../models/Order";

export const placeOrder = (orderInfo) => {
    return async (dispatch) => {
        const response = await fetch(
            "https://simple-shop-9bc6f.firebaseio.com/orders/u1.json",
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
            throw new Error("Something went wrong");
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
    return async (dispatch) => {
        try {
            const response = await fetch(
                "https://simple-shop-9bc6f.firebaseio.com/orders/u1.json"
            );

            if (!response.ok) {
                throw new Error("Something went wrong");
            }
            const resData = await response.json();

            const orderData = [];
            for (let key in resData) {
                resData[key].orderInfo.forEach((val, index) => {
                    console.log(val);
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
