"use client";
import StatisticCard from "@/components/dashboard/statistic-card";
import { useFetchAllUser } from "@/data/auth/useFetchAllUser";
import { useOrderCountByStatus } from "@/data/order/useFetchOrderByStatus";
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";

const DashBoard = () => {
  const { data: order } = useOrderCountByStatus();
  const { data: orderDelivered } = useOrderCountByStatus("delivered");
  const { data: user } = useFetchAllUser();

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticCard
          title="Tổng đơn hàng"
          value={String(order?.length)}
          icon={<ShoppingOutlined />}
          gradient="from-blue-100 to-blue-300"
          iconColor="text-blue-600"
          textColor="text-blue-800"
        />
        <StatisticCard
          title="Đơn hàng đã giao"
          value={String(orderDelivered?.length)}
          icon={<ShoppingCartOutlined />}
          gradient="from-green-100 to-green-300"
          iconColor="text-green-600"
          textColor="text-green-800"
        />
        <StatisticCard
          title="Người dùng"
          value={user?.users.length}
          icon={<UserOutlined />}
          gradient="from-purple-100 to-purple-300"
          iconColor="text-purple-600"
          textColor="text-purple-800"
        />
        <StatisticCard
          title="Sản phẩm"
          value={86}
          icon={<AppstoreOutlined />}
          gradient="from-orange-100 to-orange-300"
          iconColor="text-orange-600"
          textColor="text-orange-800"
        />
      </div>
    </div>
  );
};

export default DashBoard;
