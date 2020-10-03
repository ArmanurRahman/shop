export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";
import Product from "../../models/product";

export const deleteProduct = (pid) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(
            `https://simple-shop-9bc6f.firebaseio.com/products/${pid}.json?auth=${token}`,
            {
                method: "DELETE",
            }
        );

        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        dispatch({
            type: DELETE_PRODUCT,
            pid,
        });
    };
};

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        try {
            const response = await fetch(
                "https://simple-shop-9bc6f.firebaseio.com/products.json"
            );

            if (!response.ok) {
                throw new Error("Something went wrong");
            }
            const resData = await response.json();

            const productData = [];
            for (let key in resData) {
                productData.push(
                    new Product(
                        key,
                        resData[key].userId,
                        resData[key].title,
                        resData[key].imageUrl,
                        resData[key].description,
                        resData[key].price
                    )
                );
            }

            dispatch({
                type: SET_PRODUCT,
                products: productData,
                userProducts: productData.filter(
                    (item) => item.userId === userId
                ),
            });
        } catch (err) {
            throw err;
        }
    };
};

export const createProduct = (title, imageUrl, price, description) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(
            `https://simple-shop-9bc6f.firebaseio.com/products.json?auth=${token}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    price,
                    description,
                    userId,
                }),
            }
        );

        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        const resData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            id: resData.name,
            title,
            imageUrl,
            price,
            description,
            userId,
        });
    };
};

export const updateProduct = (productId, title, imageUrl, description) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(
            `https://simple-shop-9bc6f.firebaseio.com/products/${productId}.json?auth=${token}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    description,
                }),
            }
        );
        if (!response.ok) {
            throw new Error("Something went wrong!");
        }
        dispatch({
            type: UPDATE_PRODUCT,
            productId,
            title,
            imageUrl,
            description,
        });
    };
};
