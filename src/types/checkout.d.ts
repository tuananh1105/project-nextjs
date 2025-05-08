type ProductCheckout = {
    productId: string;
    variantId: string;
    name: string;
    image: string;
    totalPrice: number;
    priceAtTime: number;
    quantity: number;
    color: string;
    size: string;
}

type CustomerInfor = {
    name: string;
    phone: string;
    city: string;
    districts: string;
    wards: string;
    address: string;
}

type CreateCheckout = {
    userId: string;
    items: ProductCheckout[];
    customerInfo: CustomerInfor;
    paymentMethod: string;
    paymentStatus: string;
    note: string;
    totalPrice: number;
    couponCode: string;
    shippingMessageDisplay: string;
    discount: string;
}
