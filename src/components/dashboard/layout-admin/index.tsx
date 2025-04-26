import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Image, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { useRouter } from "next/navigation";
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
  getItem("Option 2", "/admin/option2", <DesktopOutlined />),
  getItem("Product", "sub1", <UserOutlined />, [
    getItem("Product List", "/admin/products"),
    getItem("Create Product", "/admin/products/create"),
    getItem("Alex", "/admin/alex"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "/admin/team1"),
    getItem("Team 2", "/admin/team2"),
  ]),
  getItem("Files", "/admin/files", <FileOutlined />),
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const onClickMenu: MenuProps["onClick"] = ({ key }) => {
    router.push(key as string);
  };

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
      <div className="demo-logo-vertical" />
      <Menu
        theme="light"
        defaultSelectedKeys={["/admin"]}
        mode="inline"
        items={items}
        onClick={onClickMenu}
      />
    </Sider>
  );
};

export default Sidebar;
