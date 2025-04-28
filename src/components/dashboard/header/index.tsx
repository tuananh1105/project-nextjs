import { Avatar, Layout, theme } from "antd";
import BreadCrumb from "@/components/dashboard/header/bread-cumb";
import { UserOutlined } from "@ant-design/icons";

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
        <Avatar
          size="large"
          icon={<UserOutlined />}
          src={
            "https://res.cloudinary.com/dfjsl3isc/image/upload/v1736418158/products/anh.png"
          }
        />
      </div>
    </AntdHeader>
  );
};

export default CustomHeader;
