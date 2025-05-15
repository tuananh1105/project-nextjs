"use client";

import { OrderColumns } from "@/components/order/columns-order";
import useOrderLogic from "@/hooks/order/useOrderLogic";
import useUpdateOrderStatus from "@/hooks/order/useUpdateOrderStatus";
import { useStyle } from "@/utils/helper";
import { Table } from "antd";

export default function OrderDelivered() {
  const status = "delivered";

  const { styles } = useStyle();
  const { orderList, isLoading, pagination, onPaginationChange, orders } =
    useOrderLogic(status);

  const { updateOrderStatus } = useUpdateOrderStatus();

  const columns = OrderColumns(updateOrderStatus);
  return (
    <div>
      <div>
        <p className="text-xl font-semibold">Danh sách đơn hàng</p>
      </div>
      <div className="bg-white p-3 rounded-lg mt-3">
        <Table<OrderList>
          className={styles.customTable}
          columns={columns}
          dataSource={orderList}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: orders?.meta?.totalItems ?? 0,
            showSizeChanger: true,
            pageSizeOptions: [2, 5, 10, 20],
          }}
          scroll={{ y: 55 * 5 }}
          loading={isLoading}
          rowKey="_id"
          onChange={onPaginationChange}
        />
      </div>
    </div>
  );
}
