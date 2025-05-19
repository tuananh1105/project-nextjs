"use client";
import { OrderedListOutlined } from "@ant-design/icons";
import { BellAlert, MapPin, User } from "@medusajs/icons";
import { Avatar } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Thông Báo", icon: <BellAlert />, href: "/user/notifications" },
  { label: "Tài Khoản Của Tôi", icon: <User />, href: "/website/user/account" },
  {
    label: "Đơn Mua",
    icon: <OrderedListOutlined />,
    href: "/website/user/user-order",
    highlight: true,
  },
  { label: "Địa Chỉ", icon: <MapPin />, href: "/website/user/address" },
  { label: "Shopee Xu", icon: <User />, href: "/user/coins" },
  {
    label: "5.5 Siêu Sale Hàng Hiệu",
    icon: <User />,
    href: "/user/sale",
    tag: "New",
  },
];

export default function UserSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-full p-4 rounded-xl bg-white max-w-[250px]">
      <div className="flex items-center gap-3 mb-6">
        <Avatar
          src="https://res.cloudinary.com/dfjsl3isc/image/upload/v1736418158/products/anh.png"
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="font-semibold text-sm text-gray-800">tuaanh_105</div>
          <button className="text-gray-500 text-xs hover:text-blue-600">
            Sửa Hồ Sơ
          </button>
        </div>
      </div>

      {/* Menu List */}
      <ul className="flex flex-col gap-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md transition 
                  ${
                    isActive
                      ? "text-red-500 font-semibold bg-red-50"
                      : "text-gray-700 hover:text-red-500 hover:bg-gray-50"
                  }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
                {item.tag && (
                  <span className="ml-auto text-[10px] bg-red-500 text-white px-1.5 rounded-full">
                    {item.tag}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
