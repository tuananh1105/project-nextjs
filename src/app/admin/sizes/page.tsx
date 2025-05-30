"use client";

import CardSize from "@/components/sizes/cart-size";
import { SizeColumns } from "@/components/sizes/columns-size";
import { useFetchSize } from "@/data/size/useFetchSize";
import useSizeMutation from "@/data/size/useSizeMutation";
import { useStyle } from "@/utils/helper";
import { Button, Empty, Table, TablePaginationConfig } from "antd";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function SizeList() {
  const { styles } = useStyle();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const { data: sizeList, isLoading } = useFetchSize({
    page: pagination.current,
    limit: pagination.pageSize,
  });

  const { deleteSize } = useSizeMutation();

  const handleDelete = async (_id: string) => {
    await deleteSize.mutate(_id);
  };

  const columns = SizeColumns({ handleDelete });

  const sizes = useMemo(() => {
    if (Array.isArray(sizeList)) {
      return sizeList.map((item) => ({
        _id: item._id,
        key: item._id,
        name: item.name,
        minHeight: item.minHeight,
        maxHeight: item.maxHeight,
        minWeight: item.minWeight,
        maxWeight: item.maxWeight,
        createdAt: item.createdAt,
      }));
    }
    if (sizeList?.data && Array.isArray(sizeList.data)) {
      return sizeList.data.map((item) => ({
        _id: item._id,
        key: item._id,
        name: item.name,
        minHeight: item.minHeight,
        maxHeight: item.maxHeight,
        minWeight: item.minWeight,
        maxWeight: item.maxWeight,
        createdAt: item.createdAt,
      }));
    }
    return [];
  }, [sizeList]);

  const handleTableChange = (paginationInfo: TablePaginationConfig) => {
    setPagination({
      current: paginationInfo.current || 1,
      pageSize: paginationInfo.pageSize || 10,
    });
  };

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-[15px] lg:text-xl mt-1 font-semibold">
          Danh sách kích thước
        </p>
        <Link href={"/admin/sizes/create"}>
          <Button>Thêm kích thước</Button>
        </Link>
      </div>
      <div className="lg:bg-white lg:p-3 rounded-lg mt-3">
        <div className="hidden lg:block">
          <Table<Size>
            className={styles.customTable}
            columns={columns}
            dataSource={sizes}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: sizeList?.meta?.totalItems ?? 0,
              showSizeChanger: true,
              pageSizeOptions: [2, 5, 10, 20],
            }}
            scroll={{ y: 55 * 5 }}
            loading={isLoading}
            rowKey="_id"
            onChange={handleTableChange}
          />
        </div>
        <div className="block lg:hidden mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
          {sizes.length > 0 ? (
            <>
              {sizes.map((item) => (
                <CardSize
                  handleDeleteSize={() => handleDelete(item._id)}
                  key={item._id}
                  size={item}
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
