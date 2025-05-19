import { SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Space } from "antd";
import React from "react";
import { useRouter } from "next/navigation"; // app router

const DropdownUser: React.FC = () => {
  const router = useRouter();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Address",
    },
    {
      key: "3",
      label: "Purchase Order",
    },
    {
      key: "4",
      label: "Settings",
      icon: <SettingOutlined />,
    },
  ];

  const onClick = ({ key }: { key: string }) => {
    switch (key) {
      case "2":
        router.push("/website/user/address");
        break;
      case "3":
        router.push("/website/user/user-order");
        break;
      case "4":
        router.push("/users/settings");
        break;
      default:
        break;
    }
  };

  return (
    <Dropdown menu={{ items, onClick }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar
            className="cursor-pointer"
            src="https://res.cloudinary.com/dfjsl3isc/image/upload/v1736418158/products/anh.png"
          />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropdownUser;
