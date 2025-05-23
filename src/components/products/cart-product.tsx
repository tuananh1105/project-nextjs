import DropdownMenu from "@/components/ui/custom-dropdown-menu";
import CurrencyVND from "@/utils/helper";
import {
  DeleteOutlined,
  EditOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";
import { Image, Tag } from "antd";
import Link from "next/link";

const CardProduct = ({
  product,
  handleDeleteProduct,
}: {
  product: CartProduct;
  handleDeleteProduct: (_id: string) => void;
}) => {
  const menu = [
    {
      key: "1",
      label: (
        <Link href={`/admin/products/${product._id}`}>Detail Product</Link>
      ),
      icon: <FolderViewOutlined />,
    },
    {
      key: "2",
      label: (
        <button
          className="text-red-400"
          onClick={() => handleDeleteProduct(product._id)}
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
          <Tag color="success">{product.category}</Tag>
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
        <div className="flex items-center gap-x-2 rounded-md bg-ui-bg-subtle p-2">
          <Image
            src={product.image ?? "/default-product.jpg"}
            alt="product"
            width={36}
            height={48}
            className="h-12 w-9 rounded-md object-cover"
          />
          <div className="space-y-1.5">
            <p className="txt-compact-medium-plus">{product.name}</p>
          </div>
        </div>
        <p>
          Giá: <CurrencyVND amount={product.price} />
        </p>
        <div className="txt-compact-small space-y-1">
          <p>Description:</p>
          <p className="text-ui-fg-subtle">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
