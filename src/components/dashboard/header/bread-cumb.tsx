"use client";

import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation";
import Link from "next/link";

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const BreadCrumb = () => {
  const pathname = usePathname();

  const pathSnippets = pathname.split("/").filter((i) => i);

  const breadcrumbItems = pathSnippets
    .filter((item) => item !== "admin")
    .map((item, index) => {
      const url = "/" + pathSnippets.slice(0, index + 1).join("/");
      return {
        title: (
          <Link href={url}>
            {capitalizeFirstLetter(decodeURIComponent(item))}
          </Link>
        ),
      };
    });

  return (
    <Breadcrumb
      items={[
        { title: <Link href="/admin">Dashboard</Link> },
        ...breadcrumbItems,
      ]}
    />
  );
};

export default BreadCrumb;
