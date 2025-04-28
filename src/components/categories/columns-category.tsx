import DropdownMenu from "@/components/ui/custom-dropdown-menu";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TableColumnsType } from "antd";

const handleDelete = (_id: string) => {
  console.log("Delete product with id:", _id);
};

const handleEdit = (_id: string) => {
  console.log("Edit product with id:", _id);
};

export const ProductColumns: TableColumnsType<Categories> = [
  {
    title: "",
    key: "menu",
    render: (record) => {
      const { id } = record;
      const menu = [
        {
          key: "2",
          label: (
            <button className="text-red-400" onClick={() => handleDelete(id)}>
              Delete
            </button>
          ),
          icon: <DeleteOutlined />,
        },
        {
          key: "3",
          label: <button onClick={() => handleEdit(id)}>Edit</button>,
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
    render: (status) => <strong>{status}</strong>,
  },
];
