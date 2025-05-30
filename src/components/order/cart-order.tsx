import OrderStatusSelector from "@/components/order/order-status-selector";
import DropdownMenu from "@/components/ui/custom-dropdown-menu";
import CurrencyVND, { formatDateTime } from "@/utils/helper";
import { FolderViewOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import Link from "next/link";

const CardOrders = ({
  order,
  updateOrderStatus,
}: {
  order: OrderList;
  updateOrderStatus: (params: { id: string; status: OrderStatus }) => void;
}) => {
  const handleChange = (newStatus: OrderStatus) => {
    updateOrderStatus({ id: order._id, status: newStatus });
  };
  const itemsArray =
    typeof order.items === "string" ? JSON.parse(order.items) : order.items;
  const menu = [
    {
      key: "1",
      label: <Link href={`/admin/products/${order._id}`}>Detail Order</Link>,
      icon: <FolderViewOutlined />,
    },
  ];
  return (
    <div className="space-y-3 max-w-full w-full bg-white rounded-lg border border-gray-300 p-3">
      <div className="flex justify-between">
        <div className="flex gap-1">
          Mã đơn hàng:
          <Tag color="success">{order.orderNumber}</Tag>
        </div>
        <DropdownMenu
          items={menu}
          trigger={["click"]}
          placement="bottomRight"
          iconSize={18}
          iconColor="#212121"
          tooltipText="Click for options"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-x-2 rounded-md">
          <div className="space-y-1.5">
            <p className="flex gap-2">
              Tên sản Phẩm:
              <span>
                {itemsArray
                  .map((item: { name: string }) => item.name)
                  .join(", ")}
              </span>
            </p>
          </div>
        </div>
        <p>
          Giá: <CurrencyVND amount={order.totalPrice} />
        </p>
        <p>
          Phương thức thanh toán:
          <span className="ml-2">
            {order.paymentMethod === "cod" ? (
              <span>Thanh toán khi nhận</span>
            ) : (
              <span>Thanh toán qua zalopay</span>
            )}
          </span>
        </p>
        <div className="flex gap-2">
          <p>Số sản phẩm:</p>
          <p className="text-ui-fg-subtle">{order.items.length}</p>
        </div>
        <div className="flex gap-2">
          <p>Ngày đặt:</p>
          <p className="text-ui-fg-subtle">{formatDateTime(order.createdAt)}</p>
        </div>
      </div>
      <div>
        <OrderStatusSelector
          onChange={handleChange}
          value={order.status as OrderStatus}
        />
      </div>
    </div>
  );
};

export default CardOrders;
