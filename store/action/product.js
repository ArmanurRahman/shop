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
    return {
        type: CREATE_PRODUCT,
        title,
        imageUrl,
        price,
        description,
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
