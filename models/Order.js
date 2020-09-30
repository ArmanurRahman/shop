class Order {
    constructor(
        orderId,
        title,
        productId,
        quantity,
        price,
        totalPrice,
        imageUrl,
        orderDate
    ) {
        this.orderId = orderId;
        this.title = title;
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
        this.totalPrice = totalPrice;
        this.imageUrl = imageUrl;
        this.orderDate = orderDate;
    }
}

export default Order;
