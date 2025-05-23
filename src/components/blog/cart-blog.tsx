import DropdownMenu from "@/components/ui/custom-dropdown-menu";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Image, Tag } from "antd";

const CardBlog = ({
  blog,
  handleDeleteBlog,
}: {
  blog: Blog;
  handleDeleteBlog: (_id: string) => void;
}) => {
  const menu = [
    {
      key: "2",
      label: (
        <button
          className="text-red-400"
          onClick={() => handleDeleteBlog(blog._id)}
        >
          Delete
        </button>
      ),
      icon: <DeleteOutlined />,
    },
    {
      key: "3",
      label: <button>Edit</button>,
      icon: <EditOutlined />,
    },
  ];
  return (
    <div className="space-y-3 max-w-full w-full bg-white rounded-lg border border-gray-300 p-3">
      <div className="flex justify-between">
        <div className="flex gap-1">Tiêu đề: {blog.title}</div>
        <DropdownMenu
          items={menu}
          trigger={["click"]}
          placement="bottomRight"
          iconSize={18}
          iconColor="#212121"
          tooltipText="Click for options"
        />
      </div>
      <div className="space-y-2">
        <div className="flex flex-col  gap-x-2 rounded-md bg-ui-bg-subtle">
          <div className="flex gap-3">
            <p>Tác giả:</p>
            <p className="txt-compact-medium-plus">{blog.author}</p>
          </div>
          <div className="flex gap-3 mt-3">
            <p>Ảnh:</p>
            <p className="txt-compact-medium-plus">
              <Image
                src={blog.thumbnail ?? "/default-product.jpg"}
                alt="product"
                width={36}
                height={48}
                className="h-12 w-9 rounded-md object-cover"
              />
            </p>
          </div>
          <div className="flex gap-3 mt-3">
            <p>Tags:</p>
            <p className="txt-compact-medium-plus">
              {blog.tags?.map((item: string, index: number) => (
                <Tag color="blue" key={index}>
                  {item}
                </Tag>
              ))}
            </p>
          </div>
          <div className="txt-compact-small space-y-1 mt-3">
            <p>Description:</p>
            <p className="text-ui-fg-subtle">{blog.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBlog;
