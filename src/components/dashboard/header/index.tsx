import BreadCrumb from "@/components/dashboard/header/bread-cumb";
import { Layout, theme } from "antd";
import DropdownAdmin from "@/components/dashboard/header/dropdown-admin";

const { Header: AntdHeader } = Layout;

const CustomHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntdHeader
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
      className="border-x border-b border-gray-300"
    >
      <div className="px-6 flex justify-between items-center h-full">
        <BreadCrumb />
        <DropdownAdmin />
      </div>
    </AntdHeader>
  );
};

export default CustomHeader;
