import React from "react";
import { Select } from "antd";

export const orderStatusData = {
  pendingPayment: ["Chờ thanh toán"],
  pending: ["Chờ xác nhận"],
  shipped: ["Đang vận chuyển"],
  received: ["Giao hàng thành công"],
  delivered: ["Hoàn thành đơn hàng"],
  canceled: ["Đã hủy"],
};

export type OrderStatusKey = keyof typeof orderStatusData;

const statusList: { id: OrderStatusKey; label: string }[] = [
  { id: "pendingPayment", label: "Chờ thanh toán" },
  { id: "pending", label: "Chờ xác nhận" },
  { id: "shipped", label: "Đang vận chuyển" },
  { id: "received", label: "Giao hàng thành công" },
  { id: "delivered", label: "Hoàn thành đơn hàng" },
  { id: "canceled", label: "Đã hủy" },
];

interface OrderStatusSelectorProps {
  value: OrderStatusKey;
  onChange: (value: OrderStatusKey) => void;
  defaultValue?: OrderStatusKey;
}

const OrderStatusSelector: React.FC<OrderStatusSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <Select
      style={{ width: 150 }}
      value={value}
      onChange={onChange}
      options={statusList.map((status) => ({
        label: status.label,
        value: status.id,
      }))}
    />
  );
};

export default OrderStatusSelector;
