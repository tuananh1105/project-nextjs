"use client";

import CardCategory from "@/components/categories/cart-category";
import { CategoryColumns } from "@/components/categories/columns-category";
import { useFetchCategory } from "@/data/categories/useCategoryList";
import useCategoryMutation from "@/data/categories/useCategoryMutation";
import { useStyle } from "@/utils/helper";
import { Button, Empty, Table, TablePaginationConfig } from "antd";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function CategoryList() {
  const { styles } = useStyle();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const { data: categoryList, isLoading } = useFetchCategory({
    page: pagination.current,
    limit: pagination.pageSize,
  });

  const { deleteCategory } = useCategoryMutation();

  const handleDelete = async (_id: string) => {
    await deleteCategory.mutate(_id);
  };

  const columns = CategoryColumns({ handleDelete });

  const categories = useMemo(() => {
    if (Array.isArray(categoryList)) {
      return categoryList.map((item) => ({
        _id: item._id,
        key: item._id,
        slug: item.slug,
        name: item.name,
        status: item.status,
      }));
    }
    if (categoryList?.data && Array.isArray(categoryList.data)) {
      return categoryList.data.map((item) => ({
        _id: item._id,
        key: item._id,
        slug: item.slug,
        name: item.name,
        status: item.status,
      }));
    }
    return [];
  }, [categoryList]);

  const handleTableChange = (paginationInfo: TablePaginationConfig) => {
    setPagination({
      current: paginationInfo.current || 1,
      pageSize: paginationInfo.pageSize || 10,
    });
  };

  return (
    <div>
      <div className="flex justify-between">
        <p className="ext-[15px] lg:text-xl mt-1 font-semibold">
          Danh sách danh mục
        </p>
        <Link href={"/admin/categories/create"}>
          <Button>Thêm danh mục</Button>
        </Link>
      </div>
      <div className="lg:bg-white lg:p-3 rounded-lg mt-3">
        <div className="hidden lg:block">
          <Table<Categories>
            className={styles.customTable}
            columns={columns}
            dataSource={categories}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: categoryList?.meta?.totalItems ?? 0,
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
          {categories.length > 0 ? (
            <>
              {categories.map((item) => (
                <CardCategory
                  handleDeleteCategory={() => handleDelete(item._id)}
                  key={item._id}
                  category={item}
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
