import { FocusModal } from "@/components/ui/custom-focus-modal";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/custom-button";
import { ArrowRightMini } from "@medusajs/icons";
import { useFetchCartByProductId } from "@/data/cart/useFetchCartByProductId";
import useLogicCart from "@/hooks/useLogicCart";
import { useFetchProductById } from "@/data/products/useProductById";

const ModalUpdateCart = ({
  isOpen,
  isClose,
  handleUpdateCart,
  productId,
  variantId,
}: {
  isOpen: boolean;
  isClose: () => void;
  handleUpdateCart: () => void;
  productId: string;
  variantId: string;
}) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const { userId } = useLogicCart();

  const { data: product } = useFetchProductById(productId);

  const colorVariants = Array.from(
    new Set((product?.data.variants ?? []).map((variant) => variant.color))
  );

  const sizeVariants = Array.from(
    new Set((product?.data.variants ?? []).map((variant) => variant.size))
  );

  const { data: cartProduct } = useFetchCartByProductId({ userId, variantId });

  if (!cartProduct || !product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <FocusModal open={isOpen} onOpenChange={isClose}>
          <FocusModal.Content className="m-auto h-[500px] max-h-[90%] w-[calc(100%-24px)] max-w-[450px] overflow-visible">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 3, scale: 1 }}
              exit={{ opacity: 0, scale: 0.1 }}
              transition={{ duration: 0.1 }}
              className="bg-white rounded-xl w-full"
            >
              <FocusModal.Header>
                <FocusModal.Title>Cập nhật sản phẩm</FocusModal.Title>
              </FocusModal.Header>
              <div className="p-5">
                <div className="flex gap-3">
                  <Image
                    src={cartProduct?.image ?? ""}
                    alt={""}
                    width={100}
                    height={100}
                    className="object-cover w-28 h-36 rounded-xl"
                  />
                  <div className="w-full max-w-full">
                    <p className="text-gray-700 text-sm whitespace-normal leading-relaxed w-full">
                      {cartProduct.name} - {cartProduct.color} -{" "}
                      {cartProduct.size}
                    </p>
                    <p className="text-sm mt-3">
                      {cartProduct.color} - {cartProduct.size}
                    </p>
                  </div>
                </div>
                <div className="border-t mt-6 text-gray-300"></div>
                <div className="space-y-4 mt-6">
                  {/* Màu sắc */}
                  <div>
                    <p className="text-sm text-gray-800 mb-2">
                      Màu sắc: {selectedColor}
                    </p>
                    <div className="flex gap-3">
                      {colorVariants?.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-10 h-10 rounded-full border cursor-pointer ${
                            selectedColor === color
                              ? "border-black"
                              : "border-gray-400"
                          }`}
                          style={{ backgroundColor: color }}
                        ></button>
                      ))}
                    </div>
                  </div>

                  {/* Kích thước */}
                  <div>
                    <p className="text-sm text-gray-800">
                      Kích thước: {selectedSize}
                    </p>
                    <div className="flex gap-3">
                      {sizeVariants?.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`border rounded-full cursor-pointer p-2 w-10 h-10 ${
                            selectedSize === size
                              ? "border-black"
                              : "border-gray-400"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t mt-1 text-gray-300"></div>
              <div className="mt-3 px-4 py-4">
                <Button
                  name="Cập nhật"
                  icon={ArrowRightMini}
                  onClick={handleUpdateCart}
                />
              </div>
            </motion.div>
          </FocusModal.Content>
        </FocusModal>
      )}
    </AnimatePresence>
  );
};

export default ModalUpdateCart;
