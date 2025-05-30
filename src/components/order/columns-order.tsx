import CurrencyVND, { formatDateTime } from "@/utils/helper";
import { EyeOutlined } from "@ant-design/icons";
import { TableColumnsType } from "antd";
import Link from "next/link";
import OrderStatusSelector from "@/components/order/order-status-selector";

export const OrderColumns = (
  updateOrderStatus: (params: { id: string; status: OrderStatus }) => void
): TableColumnsType<OrderList> => [
  {
    title: "",
    key: "view",
    render: (_, record) => {
      const { _id } = record;
      return (
        <Link href={`/admin/categories/${_id}`}>
          <EyeOutlined style={{ fontSize: 20, color: "#3b82f6" }} />
        </Link>
      );
    },
    width: 50,
  },
  {
    title: "OrderNumber",
    dataIndex: "orderNumber",
    render: (orderNumber) => <strong>{orderNumber}</strong>,
  },
  {
    title: "Name",
    key: "productNames",
    render: (_, record) => {
      const items = record.items as unknown as { name: string }[];
      const productNames = items.map((item) => item.name).join(", ");
      return <span>{productNames}</span>;
    },
  },
  {
    title: "PaymentMethod",
    dataIndex: "paymentMethod",
    render: (paymentMethod) => (
      <div>
        {paymentMethod === "cod" ? (
          <span>Thanh toán khi nhận</span>
        ) : (
          <span>Thanh toán qua zalopay</span>
        )}
      </div>
    ),
  },
  {
    title: "Items",
    dataIndex: "items",
    render: (items) => <div>{items.length}</div>,
    width: 80,
  },
  {
    title: "TotalPrice",
    dataIndex: "totalPrice",
    render: (totalPrice) => (
      <div className="text-red-500">
        <CurrencyVND amount={totalPrice} />
      </div>
    ),
    width: 100,
  },
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    render: (createdAt) => <span>{formatDateTime(createdAt)}</span>,
  },
  {
    title: "Update Status",
    dataIndex: "status",
    render: (status, record) => {
      const handleChange = (newStatus: OrderStatus) => {
        updateOrderStatus({ id: record._id, status: newStatus });
      };
      return (
        <div>
          <OrderStatusSelector
            defaultValue={status}
            value={status}
            onChange={handleChange}
          />
        </div>
      );
    },
  },
];
