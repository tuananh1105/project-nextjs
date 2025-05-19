"use client";

import ModalCancelOrder from "@/components/order/modal-cancel-order";
import { useFetchOrderByStatus } from "@/data/order/useFetchOrderByStatus";
import CurrencyVND, { STATUS_VIETNAMESE_MAP } from "@/utils/helper";
import {
  Button,
  Empty,
  Image,
  Pagination,
  PaginationProps,
  Spin,
  Tabs,
} from "antd";
import { useState } from "react";

const ORDER_STATUSES = [
  "pending",
  "received",
  "shipped",
  "delivered",
  "canceled",
];

const STATUS_LABELS: Record<string, string> = {
  pending: "Chờ Xác Nhận",
  shipped: "Đang Vận Chuyển",
  received: "Đang Vận Chuyển",
  delivered: "Đã Giao",
  canceled: "Đã Hủy",
};

const orderTabs = [
  { key: "ALL", label: "Tất Cả" },
  ...Array.from(
    new Map(ORDER_STATUSES.map((status) => [STATUS_LABELS[status], status]))
  ).map(([label, key]) => ({ key, label })),
];

const PAGESIZE = 4;

export default function UserOrderPage() {
  const [isOpenModalCancel, setIsOpenModalCancel] = useState<boolean>(false);
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGESIZE);

  const hanleCancelCloseModal = () => {
    setIsOpenModalCancel(false);
  };
  const handleCancelOpenModal = () => {
    setIsOpenModalCancel(true);
  };

  const { data: orderList, isLoading } = useFetchOrderByStatus({
    status,
    params: {
      page,
      limit: pageSize,
    },
  });

  const contentStyle: React.CSSProperties = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  };
  const content = <div style={contentStyle} />;

  const onChange: PaginationProps["onChange"] = (newPage, newPageSize) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };

  return (
    <div>
      <div className="px-3 bg-white rounded-xl">
        <Tabs
          size="large"
          defaultActiveKey="ALL"
          activeKey={status}
          onChange={(key) => {
            setStatus(key);
            setPage(1);
          }}
          items={orderTabs.map((tab) => ({
            key: tab.key,
            label: tab.label,
          }))}
          tabBarGutter={50}
        />
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        </div>
      ) : orderList?.data?.length === 0 ? (
        <div className="text-center py-10">
          <Empty />
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          {orderList?.data?.map((order: OrderUser) => (
            <div key={order._id}>
              <div className="bg-white flex justify-between p-4 border border-gray-300 rounded-sm text-sm font-semibold">
                <p>Mã đơn hàng: {order.orderNumber}</p>
                <p className="text-[#FF683D] text-[12px]">
                  {STATUS_VIETNAMESE_MAP[order.status as OrderStatus] ||
                    order.status}
                </p>
              </div>
              <div className="bg-white  p-3 border border-gray-300 rounded-sm">
                <div className="flex justify-between">
                  {order.items.map((product) => (
                    <>
                      <div className="flex gap-3">
                        <Image
                          src={product.image}
                          width={80}
                          height={80}
                          className="object-cover rounded-sm"
                        />
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-[13px] text-gray-500">
                            Phân loại hàng: {product.size} - {product.color}
                          </p>
                          <p className="text-[13px]">x{product.quantity}</p>
                        </div>
                      </div>
                      <p className="text-[#FF683D] font-semibold text-[13px] mt-6">
                        <CurrencyVND amount={product.priceAtTime} />
                      </p>
                    </>
                  ))}
                </div>
                <div className="border-t mt-5 border-gray-300">
                  <p className="flex justify-end mt-5 text-[14px] font-semibold gap-1">
                    Tổng số tiền ({order.items.length} sản phẩm):
                    <p className="text-[#FF683D] ">
                      <CurrencyVND amount={order.totalPrice} />
                    </p>
                  </p>
                </div>
              </div>
              <div className="bg-white p-3 border border-gray-300 rounded-sm flex justify-between">
                {order.status === "pending" ? (
                  <>
                    <Button
                      color="danger"
                      variant="outlined"
                      onClick={handleCancelOpenModal}
                    >
                      Huỷ đơn hàng
                    </Button>
                    <ModalCancelOrder
                      orderId={order._id}
                      isOpen={isOpenModalCancel}
                      isClose={hanleCancelCloseModal}
                    />
                  </>
                ) : null}
                <p className="text-[14px] font-semibold">
                  Thành tiền:{" "}
                  <span className="text-[#FF683D]">
                    <CurrencyVND amount={order.totalPrice} />
                  </span>
                </p>
              </div>
            </div>
          ))}

          <div className="flex justify-center">
            <Pagination
              current={page}
              pageSize={pageSize}
              total={orderList?.meta?.totalItems ?? 0}
              onChange={onChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
