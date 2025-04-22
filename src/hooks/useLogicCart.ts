import useCartMutation from "@/data/cart/useMutationCart";
import { useFetchDetailProduct } from "@/data/products/useDetailProduct";
import { useParams } from "next/navigation";
import { useState } from "react";

const useLogicCart = () => {
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(0);
     const { slug } = useParams();
      const {
        data: productDetail,
        isLoading,
        error,
      } = useFetchDetailProduct(String(slug));

      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const userId = user.user._id || "";
      const variant =
      productDetail?.product.variants.find(
        (v) =>
          v.color?.toLowerCase() === selectedColor?.toLowerCase() &&
          v.size?.toLowerCase() === selectedSize?.toLowerCase()
      ) ||
      productDetail?.product.variants.find(
        (v) => v.color?.toLowerCase() === selectedColor?.toLowerCase()
      );
  
    const sku = variant?.sku || "";
    const totalPrice = variant?.price || "";
  
    const { createCart } = useCartMutation();


    const handleAddToCart = () => {
        if (!userId) {
          console.error("UserId is missing");
          return;
        }
    
        try {
          if (!productDetail?.product) {
            console.error("Thông tin sản phẩm hoặc biến thể không hợp lệ");
            return;
          }
          createCart.mutate({
            userId: userId,
            products: [
              {
                productId: productDetail?.product._id || "",
                variantId: sku || "",
                quantity: Number(quantity) || 1,
                priceAtTime: Number(totalPrice) || 0,
                totalPrice: Number(totalPrice) || 0,
              },
            ],
          });
        } catch (error) {
          console.log("error:", error);
        }
      };
    
      const handleIncrease = () => {
        setQuantity((prev) => prev + 1);
      };
      const handleReduce = () => {
        setQuantity((prev) => Math.max(0, prev - 1));
      };
    
      const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
    
      const colorVariants = Array.from(
        new Set(productDetail?.product.variants.map((variant) => variant.color))
      );
    
      const sizeVariants = Array.from(
        new Set(productDetail?.product.variants.map((variant) => variant.size))
      );

    return {
        selectedColor,
        setSelectedColor,
        selectedSize,
        setSelectedSize,
        isModalOpen,
        setIsModalOpen,
        quantity,
        setQuantity,
        slug,
        productDetail,
        isLoading,
        error,
        userId,
        sku,
        totalPrice,
        createCart,
        handleIncrease,
        handleReduce,
        handleOpenModal,
        handleCloseModal,
        colorVariants,
        sizeVariants,
        handleAddToCart,
    }
}

export default useLogicCart