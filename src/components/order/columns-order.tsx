import CurrencyVND, { formatDateTime } from "@/utils/helper";
import { EyeOutlined } from "@ant-design/icons";
import { TableColumnsType } from "antd";
import Link from "next/link";

export const OrderColumns = (): TableColumnsType<OrderList> => [
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
  },
  {
    title: "TotalPrice",
    dataIndex: "totalPrice",
    render: (totalPrice) => (
      <div className="text-red-500">
        <CurrencyVND amount={totalPrice} />
      </div>
    ),
  },
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    render: (createdAt) => <span>{formatDateTime(createdAt)}</span>,
  },
];
