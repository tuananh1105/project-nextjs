"use client";

import CardColor from "@/components/colors/cart-color";
import { ColorColumns } from "@/components/colors/columns-color";
import useColorMutation from "@/data/colors/useColorMutation";
import { useFetchColor } from "@/data/colors/useFetchColor";
import { useStyle } from "@/utils/helper";
import { Button, Empty, Table, TablePaginationConfig } from "antd";
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
        <p className="text-[15px] lg:text-xl mt-1 font-semibold">
          Danh sách màu sắc
        </p>
        <Link href={"/admin/colors/create"}>
          <Button>Thêm màu sắc</Button>
        </Link>
      </div>
      <div className="lg:bg-white lg:p-3 rounded-lg mt-3">
        <div className="hidden lg:block">
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
        <div className="block lg:hidden mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
          {colors.length > 0 ? (
            <>
              {colors.map((item) => (
                <CardColor
                  handleDeleteColor={() => handleDelete(item._id)}
                  key={item._id}
                  color={item}
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
