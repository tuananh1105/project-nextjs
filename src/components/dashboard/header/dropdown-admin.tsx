import type { MenuProps } from "antd";
import { Avatar, Dropdown, Space } from "antd";
import { useRouter } from "next/navigation"; // App Router
import React from "react";

const DropdownAdmin: React.FC = () => {
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
      label: "Website",
    },
    {
      key: "3",
      label: "Purchase Order",
    },
  ];

  const onClick = ({ key }: { key: string }) => {
    switch (key) {
      case "2":
        router.push("/website");
        break;
      case "3":
        router.push("/website/user/user-order");
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
            size="large"
            className="cursor-pointer"
            src="https://res.cloudinary.com/dfjsl3isc/image/upload/v1736418158/products/anh.png"
            alt="User avatar"
          />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropdownAdmin;
