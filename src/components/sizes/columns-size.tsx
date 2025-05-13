import DropdownMenu from "@/components/ui/custom-dropdown-menu";
import { formatDateTime } from "@/utils/helper";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TableColumnsType } from "antd";
import Link from "next/link";

export const SizeColumns = ({
  handleDelete,
}: {
  handleDelete: (_id: string) => void;
}): TableColumnsType<Size> => [
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
    title: "MinHeight",
    dataIndex: "minHeight",
    render: (minHeight) => <div>{minHeight}</div>,
  },
  {
    title: "MaxHeight",
    dataIndex: "maxHeight",
    render: (maxHeight) => <div>{maxHeight}</div>,
  },
  {
    title: "MinWeight",
    dataIndex: "minWeight",
    render: (minWeight) => <div>{minWeight}</div>,
  },
  {
    title: "MaxWeight",
    dataIndex: "maxWeight",
    render: (maxWeight) => <div>{maxWeight}</div>,
  },

  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    render: (createdAt) => <span>{formatDateTime(createdAt)}</span>,
  },
];
