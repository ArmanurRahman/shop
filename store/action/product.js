export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = (pid) => {
    return {
        type: DELETE_PRODUCT,
        pid,
    };
};

export const createProduct = (title, imageUrl, price, description) => {
    return async (dispatch) => {
        const response = await fetch(
            "https://simple-shop-9bc6f.firebaseio.com/products.json",
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
                }),
            }
        );

        const resData = await response.json();
        console.log(resData);
        dispatch({
            type: CREATE_PRODUCT,
            id: resData.name,
            title,
            imageUrl,
            price,
            description,
        });
    };
};

export const updateProduct = (productId, title, imageUrl, description) => {
    return {
        type: UPDATE_PRODUCT,
        productId,
        title,
        imageUrl,
        description,
    };
};
