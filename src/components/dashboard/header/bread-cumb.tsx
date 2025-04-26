"use client";

import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation";
import Link from "next/link";

const BreadCrumb = () => {
  const pathname = usePathname();

  const pathSnippets = pathname.split("/").filter((i) => i);

  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = "/" + pathSnippets.slice(0, index + 1).join("/");
    const name = pathSnippets[index];

    return {
      title: <Link href={url}>{decodeURIComponent(name)}</Link>,
    };
  });

  return (
    <Breadcrumb
      items={[{ title: <Link href="/">Home</Link> }, ...breadcrumbItems]}
    />
  );
};

export default BreadCrumb;
