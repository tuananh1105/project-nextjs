"use client";

import ModalSizeGuide from "@/components/products/modal-size-guide";
import CurrencyVND from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "@medusajs/icons";
import useLogicCart from "@/hooks/useLogicCart";
import { Button } from "@/components/ui/custom-button";

export default function ProductDetail() {
  const {
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    isModalOpen,
    quantity,
    productDetail,
    isLoading,
    error,
    handleIncrease,
    handleReduce,
    handleOpenModal,
    handleCloseModal,
    colorVariants,
    sizeVariants,
    handleAddToCart,
  } = useLogicCart();
  const images = productDetail?.product?.gallery || [];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  if (isLoading) return <div>...Loading</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-[1200px] m-auto">
      <p className="mt-2 text-gray-400 text-sm">
        <Link href={"/website"}>Trang chủ /</Link>{" "}
        <span className="text-black">{productDetail?.product.name}</span>
      </p>

      <div className="max-w-[1100px] m-auto grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-7 flex gap-2">
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[500px]">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`border-2 rounded-lg cursor-pointer ${
                  selectedImage === image
                    ? "border-yellow-400"
                    : "border-gray-300"
                }`}
              >
                <Image
                  src={image}
                  alt={`gallery-${index}`}
                  width={100}
                  height={100}
                  className="object-cover w-28 h-36 rounded-lg"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="selected-product"
                width={500}
                height={500}
                className="rounded-lg object-cover max-h-[500px] w-[500px] h-[700px]"
              />
            )}
          </div>
        </div>

        <div className="col-span-5">
          <span className="font-normal text-2xl">
            <CurrencyVND amount={productDetail?.product.price ?? 0} />
          </span>
          <h3 className="text-2xl font-stretch-90% mt-2">
            {productDetail?.product.name}
          </h3>

          <div className="flex justify-between">
            <div>
              <div className="mt-5">
                <p className="text-gray-700 font-normal text-[14px]">
                  Màu sắc: {selectedColor}
                </p>
                <div className="flex gap-1 mt-2">
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

              <div className="mt-3">
                <p className="text-gray-700 font-normal text-[14px]">
                  Kích cỡ: {selectedSize}
                </p>
                <div className="flex gap-2">
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
            <p
              className="cursor-pointer mt-20 text-blue-900"
              onClick={handleOpenModal}
            >
              Hướng dẫn kích cơ
            </p>
          </div>
          <ModalSizeGuide isOpen={isModalOpen} isClose={handleCloseModal} />
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center justify-between px-3 gap-4 border-[1px] border-gray-300 rounded-full w-40 py-2">
              <button
                className="text-gray-500 hover:text-black"
                onClick={handleReduce}
              >
                <Minus className="cursor-pointer" />
              </button>
              <span className="mx-4 text-base font-medium">{quantity}</span>
              <button
                className="text-gray-500 hover:text-black"
                onClick={handleIncrease}
              >
                <Plus className="cursor-pointer" />
              </button>
            </div>
            <Button
              onClick={handleAddToCart}
              name="Thêm vào giỏ"
              icon={ShoppingBag}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
