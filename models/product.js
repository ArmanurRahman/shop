class product {
    constructor(id, userId, title, imageUrl, description, price, pushToken) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.pushToken = pushToken;
    }
}

export default product;
