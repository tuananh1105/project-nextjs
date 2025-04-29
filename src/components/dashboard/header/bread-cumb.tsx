import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation";
import Link from "next/link";

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const BreadCrumb = () => {
  const pathname = usePathname();
  const pathSnippets = pathname.split("/").filter((i) => i);

  const breadcrumbItems = pathSnippets.map((item, index) => {
    const url = "/" + pathSnippets.slice(0, index + 1).join("/");
    const isLast = index === pathSnippets.length - 1;

    return {
      title: isLast ? (
        <span>{capitalizeFirstLetter(decodeURIComponent(item))}</span>
      ) : (
        <Link href={url}>
          {capitalizeFirstLetter(decodeURIComponent(item))}
        </Link>
      ),
    };
  });

  breadcrumbItems.unshift({
    title:
      pathname === "/admin" ? (
        <span>Dashboard</span>
      ) : (
        <Link href="/admin">Dashboard</Link>
      ),
  });

  return <Breadcrumb items={breadcrumbItems} />;
};

export default BreadCrumb;
