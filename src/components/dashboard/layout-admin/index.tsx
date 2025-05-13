import {
  FileOutlined,
  HighlightOutlined,
  PieChartOutlined,
  ProductOutlined,
  ShopOutlined,
  TwitchFilled,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Image, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "/admin", <PieChartOutlined />),
  getItem("Users", "/admin/option2", <UserOutlined />),
  getItem("Categories", "sub2", <UnorderedListOutlined />, [
    getItem("Category List", "/admin/categories"),
    getItem("Create Category", "/admin/categories/create"),
  ]),
  getItem("Variants", "sub5", <HighlightOutlined />, [
    getItem("Colors", "/admin/colors"),
    getItem("Sizes", "/admin/sizes"),
  ]),
  getItem("Product", "sub1", <ProductOutlined />, [
    getItem("Product List", "/admin/products"),
    getItem("Create Product", "/admin/products/create"),
  ]),
  getItem("Order", "sub4", <ShopOutlined />, [
    getItem("Order Pending", "/admin/order"),
    getItem("Order Shipped ", "/admin/order/shipped"),
    getItem("Order Received ", "/admin/order/received"),
    getItem("Order Delivered ", "/admin/order/delivered"),
    getItem("Order Canceled ", "/admin/order/canceled"),
  ]),
  getItem("BLog", "sub3", <TwitchFilled />, [
    getItem("BLog List", "/admin/blogs"),
    getItem("Create BLog", "/admin/blogs/create"),
  ]),
  getItem("Files", "/admin/files", <FileOutlined />),
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const onClickMenu: MenuProps["onClick"] = ({ key }) => {
    router.push(key as string);
  };

  const selectedKey = pathname;
  const defaultOpenKeys = items
    .filter(
      (item): item is NonNullable<MenuItem> =>
        item !== null && item !== undefined
    )
    .filter(
      (item): item is MenuItem & { children: MenuItem[] } =>
        "children" in item && Array.isArray(item.children)
    )
    .filter((item) => item.children.some((child) => child?.key === pathname))
    .map((item) => item.key?.toString() || "");

  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="flex justify-center items-center py-3">
        <Image width={40} src="/images/logo_fashion.png" preview={false} />
      </div>
      <Menu
        theme="light"
        mode="inline"
        items={items}
        onClick={onClickMenu}
        selectedKeys={[selectedKey]}
        defaultOpenKeys={defaultOpenKeys}
      />
    </Sider>
  );
};

export default Sidebar;
