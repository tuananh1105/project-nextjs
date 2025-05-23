import DropdownMenu from "@/components/ui/custom-dropdown-menu";
import { formatDateTime } from "@/utils/helper";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const CardSize = ({
  size,
  handleDeleteSize,
}: {
  size: Size;
  handleDeleteSize: (_id: string) => void;
}) => {
  const menu = [
    {
      key: "2",
      label: (
        <button
          className="text-red-400"
          onClick={() => handleDeleteSize(size._id)}
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
        <div className="flex gap-1">Size: {size.name}</div>
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
            <p>Chiều cao nhỏ:</p>
            <p className="txt-compact-medium-plus">{size.minHeight}</p>
          </div>
          <div className="flex gap-3">
            <p>Chiều cao lớn:</p>
            <p className="txt-compact-medium-plus">{size.maxHeight}</p>
          </div>
          <div className="flex gap-3">
            <p>Cân nặng bé:</p>
            <p className="txt-compact-medium-plus">{size.minWeight}</p>
          </div>
          <div className="flex gap-3">
            <p>Cân nặng lớn:</p>
            <p className="txt-compact-medium-plus">{size.maxWeight}</p>
          </div>

          <div className="flex gap-3">
            <p>Ngày tạo:</p>
            <p className="txt-compact-medium-plus">
              {formatDateTime(size.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSize;
