import { useFetchOrderByStatus } from "@/data/order/useFetchOrderByStatus";
import { TablePaginationConfig } from "antd";
import { useState, useMemo } from "react";

function useOrderLogic(status: OrderStatus) {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const { data: orders, isLoading } = useFetchOrderByStatus({
    status,
    params: { page: pagination.current, limit: pagination.pageSize },
  });

  const orderList = useMemo(() => {
    if (Array.isArray(orders)) {
      return orders.map((item) => ({
        _id: item._id,
        key: item._id,
        orderNumber: item.orderNumber,
        name: item.name,
        paymentMethod: item.paymentMethod,
        items: item.items,
        status: item.status,
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
        status: item.status,
        totalPrice: item.totalPrice,
        createdAt: item.createdAt,
      }));
    }
    return [];
  }, [orders]);

  const onPaginationChange = (paginationInfo: TablePaginationConfig) => {
    setPagination({
      current: paginationInfo.current || 1,
      pageSize: paginationInfo.pageSize || 10,
    });
  };

  return { orderList, isLoading, pagination, onPaginationChange, orders };
}

export default useOrderLogic
