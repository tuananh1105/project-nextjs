"use client"; // Đảm bảo đây là Client Component

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Checkout = () => {
  const searchParams = useSearchParams();
  const [selectedProducts, setSelectedProducts] = useState<ProductCheckout[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const selectedProductsParam = searchParams.get("selectedProducts");

    if (selectedProductsParam) {
      try {
        const products = JSON.parse(selectedProductsParam);
        setSelectedProducts(products);
      } catch (error) {
        console.error("Failed to parse selectedProducts:", error);
      }
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedProducts.length) {
    return <div>Không có sản phẩm được chọn !</div>;
  }

  return (
    <div>
      <h1>Checkout</h1>
      <ul>
        {selectedProducts.map((product, index) => (
          <li key={index}>
            <Image
              src={product.image}
              alt={product.name}
              width={100}
              height={100}
            />
            <div>
              <strong>{product.name}</strong> - {product.size} - {product.color}
            </div>
            <div>
              Quantity: {product.quantity} - Total Price: {product.totalPrice}{" "}
              VND
            </div>
          </li>
        ))}
      </ul>
      <button>Proceed to Payment</button>
    </div>
  );
};

export default Checkout;
