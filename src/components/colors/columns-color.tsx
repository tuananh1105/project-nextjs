import DropdownMenu from "@/components/ui/custom-dropdown-menu";
import { formatDateTime } from "@/utils/helper";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TableColumnsType } from "antd";
import Link from "next/link";

export const ColorColumns = ({
  handleDelete,
}: {
  handleDelete: (_id: string) => void;
}): TableColumnsType<Color> => [
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
    title: "ColorCode",
    dataIndex: "colorCode",
    render: (colorCode) => <div>{colorCode}</div>,
  },
  {
    title: "Color",
    dataIndex: "colorCode",
    render: (colorCode) => (
      <div className="flex justify-start pr-4">
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: colorCode,
            border: "1px solid #ddd",
          }}
        />
      </div>
    ),
  },
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    render: (createdAt) => <span>{formatDateTime(createdAt)}</span>,
  },
];
