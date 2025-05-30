"use client";

import CardBlog from "@/components/blog/cart-blog";
import { BlogColumns } from "@/components/blog/columns-blog";
import { useFetchBlog } from "@/data/blog/useBlogList";
import useBlogMutation from "@/data/blog/useBlogMutation";
import { useStyle } from "@/utils/helper";
import { Button, Empty, Table, TablePaginationConfig } from "antd";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function BlogList() {
  const { styles } = useStyle();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const { data: blogList, isLoading } = useFetchBlog({
    page: pagination.current,
    limit: pagination.pageSize,
  });

  const { deleteBlog } = useBlogMutation();

  const handleDelete = async (_id: string) => {
    await deleteBlog.mutate(_id);
  };

  const columns = BlogColumns({ handleDelete });

  const blog = useMemo(() => {
    if (Array.isArray(blogList)) {
      return blogList.map((item) => ({
        _id: item._id,
        key: item._id,
        title: item.name,
        tags: item.tag,
        author: item.author,
        thumbnail: item.thumbnail,
        description: item.description,
      }));
    }
    if (blogList?.data && Array.isArray(blogList.data)) {
      return blogList.data.map((item) => ({
        _id: item._id,
        key: item._id,
        title: item.title,
        author: item.author,
        tags: item.tags,
        thumbnail: item.thumbnail,
        description: item.description,
      }));
    }
    return [];
  }, [blogList]);

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
          Danh sách tin tức
        </p>
        <Link href={"/admin/blogs/create"}>
          <Button>Thêm tin tức</Button>
        </Link>
      </div>
      <div className="lg:bg-white lg:p-3 rounded-lg mt-3">
        <div className="hidden lg:block">
          <Table<Blog>
            className={styles.customTable}
            columns={columns}
            dataSource={blog}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: blogList?.meta?.totalItems ?? 0,
              showSizeChanger: true,
              pageSizeOptions: [2, 5, 10, 20],
            }}
            scroll={{ y: 55 * 5 }}
            loading={isLoading}
            rowKey="_id"
            onChange={handleTableChange}
          />
        </div>
        <div className="lg:hidden mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
          {blog.length > 0 ? (
            <>
              {blog.map((item) => (
                <CardBlog
                  handleDeleteBlog={() => handleDelete(item._id)}
                  key={item._id}
                  blog={item}
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
