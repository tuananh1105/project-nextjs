import DropdownMenu from "@/components/ui/custom-dropdown-menu";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Image, TableColumnsType, Tag, Tooltip } from "antd";
import Link from "next/link";

export const BlogColumns = ({
  handleDelete,
}: {
  handleDelete: (_id: string) => void;
}): TableColumnsType<Blog> => [
  {
    title: "",
    key: "menu",
    render: (__, record) => {
      const { _id } = record;
      const menu = [
        {
          key: "2",
          label: (
            <button className="text-red-400" onClick={() => handleDelete(_id)}>
              Delete
            </button>
          ),
          icon: <DeleteOutlined />,
        },
        {
          key: "3",
          label: <Link href={`/admin/categories/${_id}`}>Edit</Link>,
          icon: <EditOutlined />,
        },
      ];

      return (
        <DropdownMenu
          items={menu}
          trigger={["click"]}
          placement="bottomRight"
          iconSize={18}
          iconColor="#212121"
          tooltipText="Click for options"
        />
      );
    },
    width: 50,
  },
  {
    title: "Title",
    dataIndex: "title",
    render: (title) => (
      <Tooltip title={title}>
        <strong>{title.slice(0, 20)}...</strong>
      </Tooltip>
    ),
  },
  {
    title: "Author",
    dataIndex: "author",
    render: (author) => <div>{author}</div>,
  },
  {
    title: "Tags",
    dataIndex: "tags",
    render: (tags) => (
      <div className="flex flex-wrap gap-2">
        {tags?.map((item: string, index: number) => (
          <Tag color="blue" key={index}>
            {item}
          </Tag>
        ))}
      </div>
    ),
  },
  {
    title: "Thumbnail",
    dataIndex: "thumbnail",
    render: (thumbnail) => (
      <Tooltip title="Click to view image">
        <Image
          className="rounded-lg"
          src={thumbnail}
          alt="Product"
          style={{ width: 40, height: 50 }}
        />
      </Tooltip>
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
    render: (description) => (
      <Tooltip title={description}>
        <span>{description.slice(0, 20)}...</span>
      </Tooltip>
    ),
  },
];
