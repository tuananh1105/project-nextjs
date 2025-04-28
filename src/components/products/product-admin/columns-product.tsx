import DropdownMenu from "@/components/ui/custom-dropdown-menu";
import CurrencyVND from "@/utils/helper";
import {
  DeleteOutlined,
  EditOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";
import { Image, TableColumnsType, Tooltip } from "antd";
import Link from "next/link";

const handleDelete = (_id: string) => {
  console.log("Delete product with id:", _id);
};

const handleEdit = (_id: string) => {
  console.log("Edit product with id:", _id);
};

export const ProductColumns: TableColumnsType<ProductAdmin> = [
  {
    title: "",
    key: "menu",
    render: (_, record) => {
      const { slug, _id } = record;

      const menu = [
        {
          key: "1",
          label: <Link href={`/admin/products/${slug}`}>Detail Product</Link>,
          icon: <FolderViewOutlined />,
        },
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
          label: <button onClick={() => handleEdit(_id)}>Edit</button>,
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
    title: "Name",
    dataIndex: "name",
    render: (name) => <strong>{name}</strong>,
  },
  {
    title: "Category",
    dataIndex: "category",
    render: (category) => <span>{category.toUpperCase()}</span>,
  },
  {
    title: "Price",
    dataIndex: "price",
    render: (price) => (
      <p className="text-red-400">
        <CurrencyVND amount={price} />
      </p>
    ),
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (image) => (
      <Tooltip title="Click to view image">
        <Image
          className="rounded-lg"
          src={image}
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
