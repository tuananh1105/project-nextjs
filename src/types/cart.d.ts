type ProductCart = {
    price: number;
    description: ReactNode;
    productId: string;
    variantId: string;
    quantity: number | string;
    totalPrice: string | number;
    priceAtTime: number;
    color?: string;
    image?: string;
    size?: string;
    name?: string;
}

type Cart = {
    userId: string;
    products: ProductCart[];
}


type CartByProductId = {
    productId: string;
    variantId: string;
    quantity: number | string;
    totalPrice: string | number;
    priceAtTime: number;
    color?: string;
    image?: string;
    size?: string;
    name?: string;
}
