"use client";

import CardOrders from "@/components/order/cart-order";
import { OrderColumns } from "@/components/order/columns-order";
import useOrderLogic from "@/hooks/order/useOrderLogic";
import useUpdateOrderStatus from "@/hooks/order/useUpdateOrderStatus";
import { useStyle } from "@/utils/helper";
import { Empty, Table } from "antd";

export default function OrderShipped() {
  const status = "shipped";

  const { styles } = useStyle();
  const { orderList, isLoading, pagination, onPaginationChange, orders } =
    useOrderLogic(status);
  const { updateOrderStatus } = useUpdateOrderStatus();

  const columns = OrderColumns(updateOrderStatus);

  return (
    <div>
      <div>
        <p className="text-[15px] lg:text-xl mt-1 font-semibold">
          Danh sách đơn hàng
        </p>
      </div>
      <div className="lg:bg-white lg:p-3 rounded-lg mt-3">
        <div className="hidden lg:block">
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

        <div className="block lg:hidden mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
          {orderList.length > 0 ? (
            <>
              {orderList.map((item: OrderList) => (
                <CardOrders
                  key={item._id}
                  order={item}
                  updateOrderStatus={updateOrderStatus}
                />
              ))}
            </>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
      </div>
    </div>
  );
}
