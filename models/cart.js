class Cart {
    constructor(
        userId,
        productId,
        title,
        imageUrl,
        quantity,
        totalPrice,
        price,
        pushToken
    ) {
        this.userId = userId;
        this.productId = productId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.price = price;
        this.pushToken = pushToken;
    }
}

export default Cart;
