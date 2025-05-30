"use client";

import ModalContentAddress from "@/components/address/list-address";
import ModalListAddress from "@/components/address/modal-list-address";
import { useFetchAddressById } from "@/data/address/useFetchAddress";
import useOrderMutation from "@/data/order/useOrderMutation";
import { getUserId } from "@/lib/get-userId";
import CurrencyVND from "@/utils/helper";
import { EnvironmentOutlined, ReconciliationOutlined } from "@ant-design/icons";
import { Image } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Checkout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("online");
  const userId = getUserId();
  const searchParams = useSearchParams();
  const [selectedProducts, setSelectedProducts] = useState<ProductCheckout[]>(
    []
  );

  const { data: address } = useFetchAddressById(userId);

  const { createOrder, deleteFormCart } = useOrderMutation();

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

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckout = async () => {
    const items = Array.isArray(selectedProducts) ? selectedProducts : [];
    const variantIds = items.map((item) => item.variantId);

    await createOrder.mutateAsync({
      userId: userId,
      items: items,
      customerInfo: {
        name: address?.data.name || "",
        phone: address?.data.phone || "",
        city: address?.data.city || "",
        districts: address?.data.district || "",
        wards: address?.data.ward || "",
        address: address?.data.address || "",
      },
      paymentMethod: selectedMethod,
      paymentStatus: "pending",
      note: "",
      totalPrice: total,
      couponCode: "",
      shippingMessageDisplay: "",
      discount: "",
    });

    await deleteFormCart.mutateAsync({
      userId: userId,
      variantIds: variantIds,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedProducts.length) {
    return <div>Không có sản phẩm được chọn !</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 m-auto max-w-[1200px] gap-3 p-4">
      <div className="col-span-6 lg:col-span-8">
        <p className="lg:text-xl text-lg">Đơn hàng của tôi</p>
        <div className="mt-4 bg-white px-6 py-3 border border-gray-200 rounded-lg shadow">
          <p className="lg:text-lg text-md flex gap-2 text-[#FF5B2C]">
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
          <p className="border border-[#FF5B2C] w-20 text-center text-[#FF5B2C] mt-2 text-sm">
            Mặc định
          </p>
          <p
            onClick={handleOpenModal}
            className="text-[#0097FF] text-sm mt-2 cursor-pointer"
          >
            Thay đổi
          </p>
          <ModalListAddress
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCloseModal}
            confirmLoading={confirmLoading}
            title="Danh sách địa chỉ"
            content={<ModalContentAddress />}
          />
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
            <span className="text-[#FF5B2C] font-semibold ml-2">
              <CurrencyVND amount={total} />
            </span>
          </div>
        </div>
      </div>
      <div className="col-span-6 lg:col-span-4">
        <p className="lg:text-xl text-lg">Thông tin liên quan</p>
        <div className="bg-white shadow mt-4 border border-gray-300 rounded-lg px-4 py-7.5">
          <p className="lg:text-lg text-md">
            <ReconciliationOutlined /> Chi tiết thanh toán
          </p>
          <div className="flex justify-between mt-3">
            <p className="text-sm text-gray-600">Tổng tiền hàng</p>
            <span className="text-sm text-gray-600">
              <CurrencyVND amount={total} />
            </span>
          </div>
          <div className="flex justify-between mt-3">
            <p className="text-sm text-gray-600">Phí vận chuyển</p>
            <span className="text-sm text-gray-600">0 đ</span>
          </div>
          <div className="flex justify-between mt-3">
            <p className="text-sm text-gray-600">Tổng thanh toán:</p>
            <span className="text-lg text-[#FF5B2C]">
              <CurrencyVND amount={total} />
            </span>
          </div>
        </div>
        <div className="bg-white p-2 mt-3 border border-gray-300 rounded-lg shadow">
          <p className="text-sm text-gray-600 mb-3">Ghi chú</p>
          <TextArea />
        </div>

        <div className="bg-white shadow border border-gray-300 rounded-lg mt-3">
          <div className="p-4">
            <p className="lg:text-lg text-md">Phương thức thanh toán</p>
            <button
              onClick={() => setSelectedMethod("cod")}
              className={`border text-sm font-semibold px-2 rounded-sm py-3 mt-4 max-w-full w-[500px] cursor-pointer
          ${
            selectedMethod === "cod"
              ? "text-[#F06641] border-[#F06641] shadow-lg"
              : "text-black border-gray-400"
          }`}
            >
              Thanh toán khi nhận hàng
            </button>

            <button
              onClick={() => setSelectedMethod("online")}
              className={`border text-sm font-semibold px-2 rounded-sm py-3 mt-2 max-w-full w-[500px] cursor-pointer
          ${
            selectedMethod === "online"
              ? "text-[#F06641] border-[#F06641] shadow-lg"
              : "text-black border-gray-400"
          }`}
            >
              Thanh toán Zalo pay
            </button>
          </div>
          <div className="border-b text-gray-300"></div>
          <div className="px-3 py-4 ">
            <p className="text-sm text-gray-800">
              Nhấn đặt hàng đồng với việc bạn đồng ý tuân theo Điều Khoản của
              FASHION ZONE
            </p>
            <button
              onClick={handleCheckout}
              className="bg-[#FF5B2C] text-white text-sm max-w-full w-[500px] py-2 rounded-sm mt-3 cursor-pointer"
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
