"use client";

import { OrderColumns } from "@/components/order/columns-order";
import { useFetchOrderByStatus } from "@/data/order/useFetchOrderByStatus";
import { useStyle } from "@/utils/helper";
import { Table, TablePaginationConfig } from "antd";
import { useMemo, useState } from "react";

export default function OrderReceived() {
  const { styles } = useStyle();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const status = "received";

  const { data: orders, isLoading } = useFetchOrderByStatus({
    status,
    params: { page: pagination.current, limit: pagination.pageSize },
  });

  const columns = OrderColumns();

  const orderList = useMemo(() => {
    if (Array.isArray(orders)) {
      return orders.map((item) => ({
        _id: item._id,
        key: item._id,
        orderNumber: item.orderNumber,
        name: item.name,
        paymentMethod: item.paymentMethod,
        items: item.items,
        totalPrice: item.totalPrice,
        createdAt: item.createdAt,
      }));
    }
    if (orders?.data && Array.isArray(orders.data)) {
      return orders.data.map((item: OrderList) => ({
        _id: item._id,
        key: item._id,
        orderNumber: item.orderNumber,
        name: item.name,
        paymentMethod: item.paymentMethod,
        items: item.items,
        totalPrice: item.totalPrice,
        createdAt: item.createdAt,
      }));
    }
    return [];
  }, [orders]);

  const handleTableChange = (paginationInfo: TablePaginationConfig) => {
    setPagination({
      current: paginationInfo.current || 1,
      pageSize: paginationInfo.pageSize || 10,
    });
  };

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
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
}
