import { Layout, theme } from "antd";
import BreadCrumb from "@/components/dashboard/header/bread-cumb";

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
      <div className="px-6 flex flex-col justify-center h-full">
        <BreadCrumb />
      </div>
    </AntdHeader>
  );
};

export default CustomHeader;
