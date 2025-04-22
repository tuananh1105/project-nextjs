type ProductCart = {
    productId: string;
    variantId: string;
    quantity: number | string;
    totalPrice: string | number;
    priceAtTime: number
}

type Cart = {
    userId: string;
    products: ProductCart[];
}
