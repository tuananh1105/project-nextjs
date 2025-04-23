"use client";

import ModalDeleteCart from "@/components/cart/modal-delete-cart";
import CartProduct from "@/components/cart/product-cart";
import { Button } from "@/components/ui/custom-button";
import { useFetchCart } from "@/data/cart/useFetchCart";
import useCartMutation from "@/data/cart/useMutationCart";
import useLogicCart from "@/hooks/useLogicCart";
import { ArrowRightMini } from "@medusajs/icons";
import { Label } from "@medusajs/ui";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Cart() {
  const router = useRouter();
  const [selectedAll, setSelectedAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkkedItems, setCheckedItiems] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const { userId } = useLogicCart();
  const { data: cart } = useFetchCart(userId);
  const { deleteCart } = useCartMutation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (cart?.products) {
      setCheckedItiems(cart.products.map(() => false));
    }
  }, [cart?.products]);

  const handleSelectAll = () => {
    const newValue = !selectedAll;
    setSelectedAll(newValue);
    setCheckedItiems(Array(checkkedItems.length).fill(newValue));
  };

  const handleCheckItem = (index: number) => {
    const updated = [...checkkedItems];
    updated[index] = !updated[index];
    setCheckedItiems(updated);
    setSelectedAll(updated.every((item) => item));
  };

  const handleCheckout = () => {
    console.log("hih");
  };

  const handleDeleteCartById = (variantIds: string) => {
    const variantIdsArray = Array.isArray(variantIds)
      ? variantIds
      : typeof variantIds === "string"
      ? [variantIds]
      : [];

    if (variantIdsArray.length === 0) {
      console.warn("variantIds không hợp lệ:", variantIds);
      return;
    }

    const isProductInCart = cart?.products?.some((product) =>
      variantIdsArray.includes(product.variantId)
    );

    if (!isProductInCart) {
      toast.error("Sản phẩm không tồn tại trong giỏ hàng.");
      return;
    }

    try {
      deleteCart.mutate({
        userId: userId,
        variantIds: variantIdsArray,
      });
      router.push("/website/cart");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="border-b border-t border-gray-200 py-5">
        <p className="text-center text-xl font-semibold">Giỏ Hàng</p>
      </div>
      <div className="max-w-[1200px] m-auto">
        <div className="grid grid-cols-12 mt-10 gap-5">
          <div className="col-span-8 border-[1px] border-gray-300 rounded-2xl p-7 ">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedAll}
                onChange={handleSelectAll}
                className="custom-checkbox"
              />
              <Label
                htmlFor="billing-shipping"
                className="text-sm text-[#111928]"
              >
                Chọn tất cả
              </Label>
            </div>
            {cart?.products.map((product, index) => (
              <Fragment key={product.variantId}>
                <CartProduct
                  checked={checkkedItems[index] ?? false}
                  product={product}
                  handleModalDeleteCart={handleOpenModal}
                  onCheckboxChange={() => handleCheckItem(index)}
                />
                <ModalDeleteCart
                  isOpen={isModalOpen}
                  isClose={handleCloseModal}
                  handleDeleteCartById={() =>
                    handleDeleteCartById(product.variantId)
                  }
                />
              </Fragment>
            ))}
          </div>
          <div className="col-span-4 border-[1px] border-gray-300 rounded-xl p-7 h-[330px]">
            <p className="font-semibold">Chi tiết đơn hàng </p>
            <div className="flex flex-col justify-between mt-3 gap-3">
              <div className=" text-[15px] flex justify-between">
                <p className="text-gray-800">Tổng tiền</p>
                <span className="font-medium">499.000đ</span>
              </div>
              <div className="text-[15px] flex justify-between">
                <p className="text-gray-800">Giảm giá</p>
                <span className="font-medium">0đ</span>
              </div>
            </div>
            <div className="border-t mt-5 text-gray-400"></div>
            <div className="mt-5 flex justify-between">
              <p className="text-gray-800">Thành tiền</p>
              <div>
                <span className="text-2xl flex justify-end">499.000đ</span>
                <p className="text-[12px] text-gray-800">
                  Mua nhiều giảm nhiều
                </p>
              </div>
            </div>
            <div className="mt-10">
              <Button
                onClick={handleCheckout}
                name="Đặt Hàng"
                icon={ArrowRightMini}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
