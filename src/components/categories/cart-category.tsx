import DropdownMenu from "@/components/ui/custom-dropdown-menu";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Tag } from "antd";

const CardCategory = ({
  category,
  handleDeleteCategory,
}: {
  category: Categories;
  handleDeleteCategory: (_id: string) => void;
}) => {
  const menu = [
    {
      key: "2",
      label: (
        <button
          className="text-red-400"
          onClick={() => handleDeleteCategory(category._id)}
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
        <div className="flex gap-1">
          Danh mục:
          <Tag color="success">{category.name}</Tag>
        </div>
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
        <div className="flex items-center gap-x-2 rounded-md bg-ui-bg-subtle">
          <div className="flex gap-3">
            <p>Trạng thái:</p>
            <p className="txt-compact-medium-plus">{category.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCategory;
