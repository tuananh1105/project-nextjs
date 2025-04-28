"use client";

import { ProductColumns } from "@/components/products/product-admin/columns-product";
import { useFetchProducts } from "@/data/products/useProductList";
import { useStyle } from "@/utils/helper";
import { Button, Table, TablePaginationConfig } from "antd";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function ProductList() {
  const { styles } = useStyle();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const { data: listProduct, isLoading } = useFetchProducts({
    page: pagination.current,
    limit: pagination.pageSize,
  });

  const products = useMemo(() => {
    return (
      listProduct?.data?.map((item) => ({
        _id: item._id,
        key: item._id,
        slug: item.slug,
        name: item.name,
        category: item.category?.name || "",
        price: item.price,
        image: item.image,
        description: item.description,
      })) || []
    );
  }, [listProduct]);

  const handleTableChange = (paginationInfo: TablePaginationConfig) => {
    setPagination({
      current: paginationInfo.current || 1,
      pageSize: paginationInfo.pageSize || 10,
    });
  };

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Danh sách sản phẩm</p>
        <Link href={"/admin/products/create"}>
          <Button>Thêm sản phẩm</Button>
        </Link>
      </div>
      <div className="bg-white p-3 rounded-lg mt-3">
        <Table<ProductAdmin>
          className={styles.customTable}
          columns={ProductColumns}
          dataSource={products}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: listProduct?.meta?.totalItems ?? 0,
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
