"use client";

import { ColorColumns } from "@/components/colors/columns-color";
import useColorMutation from "@/data/colors/useColorMutation";
import { useFetchColor } from "@/data/colors/useFetchColor";
import { useStyle } from "@/utils/helper";
import { Button, Table, TablePaginationConfig } from "antd";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function ColorList() {
  const { styles } = useStyle();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const { data: colorList, isLoading } = useFetchColor({
    page: pagination.current,
    limit: pagination.pageSize,
  });

  const { deleteColor } = useColorMutation();

  const handleDelete = async (_id: string) => {
    await deleteColor.mutate(_id);
  };

  const columns = ColorColumns({ handleDelete });

  const colors = useMemo(() => {
    if (Array.isArray(colorList)) {
      return colorList.map((item) => ({
        _id: item._id,
        key: item._id,
        name: item.name,
        colorCode: item.colorCode,
        createdAt: item.createdAt,
      }));
    }
    if (colorList?.data && Array.isArray(colorList.data)) {
      return colorList.data.map((item) => ({
        _id: item._id,
        key: item._id,
        name: item.name,
        colorCode: item.colorCode,
        createdAt: item.createdAt,
      }));
    }
    return [];
  }, [colorList]);

  const handleTableChange = (paginationInfo: TablePaginationConfig) => {
    setPagination({
      current: paginationInfo.current || 1,
      pageSize: paginationInfo.pageSize || 10,
    });
  };

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Danh sách màu sắc</p>
        <Link href={"/admin/colors/create"}>
          <Button>Thêm màu sắc</Button>
        </Link>
      </div>
      <div className="bg-white p-3 rounded-lg mt-3">
        <Table<Color>
          className={styles.customTable}
          columns={columns}
          dataSource={colors}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: colorList?.meta?.totalItems ?? 0,
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
