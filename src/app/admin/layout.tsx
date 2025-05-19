"use client";

import CustomHeader from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/layout-admin";
import { getRole } from "@/lib/get-userId";
import { Layout } from "antd";
import { redirect } from "next/navigation";

const { Content, Footer } = Layout;

const DashBoardPage = ({ children }: { children: React.ReactNode }) => {
  const role = getRole();
  if (role !== "admin") {
    redirect("/website");
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <CustomHeader />
        <Content style={{ margin: "16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashBoardPage;
