import DropdownMenu from "@/components/ui/custom-dropdown-menu";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TableColumnsType, Tag } from "antd";
import Link from "next/link";

export const CategoryColumns = ({
  handleDelete,
}: {
  handleDelete: (_id: string) => void;
}): TableColumnsType<Categories> => [
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
    title: "Name",
    dataIndex: "name",
    render: (name) => <strong>{name}</strong>,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => (
      <div>
        <Tag color={status === "SHOW" ? "success" : "error"}>{status}</Tag>
      </div>
    ),
  },
];
