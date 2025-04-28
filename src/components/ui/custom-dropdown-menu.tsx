import { Dropdown, MenuProps, Space, Tooltip } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import React from "react";

interface DropdownMenuProps {
  items: MenuProps["items"];
  trigger?: string[];
  placement?:
    | "topLeft"
    | "topCenter"
    | "topRight"
    | "bottomLeft"
    | "bottomCenter"
    | "bottomRight";
  iconSize?: number;
  iconColor?: string;
  tooltipText?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  placement = "bottomRight",
  iconSize = 20,
  iconColor = "#1890ff",
  tooltipText = "Click to open menu",
}) => (
  <Dropdown menu={{ items }} trigger={["click"]} placement={placement}>
    <a onClick={(e) => e.preventDefault()}>
      <Tooltip title={tooltipText} placement="top">
        <Space>
          <MoreOutlined style={{ fontSize: iconSize, color: iconColor }} />
        </Space>
      </Tooltip>
    </a>
  </Dropdown>
);

export default DropdownMenu;
