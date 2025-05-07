"use client";

import ModalListAddress from "@/components/address/modal-list-address";
import { useFetchAddressById } from "@/data/address/useFetchAddress";
import { getUserId } from "@/lib/get-userId";
import CurrencyVND from "@/utils/helper";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Checkout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = getUserId();
  const searchParams = useSearchParams();
  const [selectedProducts, setSelectedProducts] = useState<ProductCheckout[]>(
    []
  );

  const { data: address } = useFetchAddressById(userId);

  const total = selectedProducts.reduce(
    (sum, item) => sum + item.totalPrice,
    0
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedProducts.length) {
    return <div>Không có sản phẩm được chọn !</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 m-auto max-w-[1200px] gap-3">
      <div className="col-span-6 lg:col-span-8">
        <p className="text-xl">Đơn hàng của tôi</p>
        <div className="mt-4 bg-white px-6 py-3 border border-gray-200 rounded-lg shadow">
          <p className="text-lg flex gap-2 text-orange-400">
            <EnvironmentOutlined />
            Địa chỉ nhận hàng
          </p>
          <p className="font-semibold mt-2 text-sm">
            Họ tên: <span className="font-medium">{address?.data.name}</span>
          </p>
          <p className="font-semibold mt-2 text-sm">
            Số điện thoại:{" "}
            <span className="font-medium">{address?.data.phone}</span>
          </p>
          <p className="font-semibold mt-2 text-sm">
            Địa chỉ:
            <span className="font-medium">
              {address?.data.address}, {address?.data.ward},{" "}
              {address?.data.district},{address?.data.city}
            </span>
          </p>
          <p className="border border-orange-400 w-20 text-center text-orange-400 mt-2 text-sm">
            Mặc định
          </p>
          <p
            onClick={handleOpenModal}
            className="text-[#0097FF] text-sm mt-2 cursor-pointer"
          >
            Thay đổi
          </p>
          <ModalListAddress isOpen={isModalOpen} isClose={handleCloseModal} />
        </div>

        <div className="border border-gray-300 rounded-lg bg-white overflow-hidden mt-3 shadow">
          <table className="w-full text-sm text-left">
            <thead className=" text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3">Sản phẩm</th>
                <th className="px-4 py-3 text-center">Số lượng</th>
                <th className="px-4 py-3 text-center">Giá tiền</th>
                <th className="px-4 py-3 text-right">Thành tiền</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {selectedProducts.map((product, index) => (
                <>
                  <tr className="border-t border-gray-300" key={index}>
                    <td className="flex items-start gap-4 px-4 py-4">
                      <Image
                        className="rounded-lg"
                        src={product.image}
                        alt={product.name}
                        width={50}
                        height={60}
                      />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500 flex gap-2 mt-1">
                          <span>🎨 {product.color}</span>
                          <span>📏 {product.size}</span>
                        </div>
                      </div>
                    </td>
                    <td className="text-center px-4 py-4">
                      x{product.quantity}
                    </td>
                    <td className="text-center px-4 py-4">
                      <CurrencyVND amount={Number(product.priceAtTime)} />
                    </td>
                    <td className="text-right px-4 py-4 font-medium">
                      <CurrencyVND amount={Number(product.totalPrice)} />
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end px-4 py-3 border-t border-gray-300 text-sm text-gray-600">
            Tổng số tiền ({selectedProducts.length} sản phẩm):
            <span className="text-orange-500 font-semibold ml-2">
              <CurrencyVND amount={total} />
            </span>
          </div>
        </div>
      </div>
      <div className="col-span-6 lg:col-span-4 bg-red-300">dsjkdj</div>
    </div>
  );
};

export default Checkout;
