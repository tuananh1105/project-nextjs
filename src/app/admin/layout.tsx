"use client";

import CustomHeader from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/layout-admin";
import { Layout } from "antd";

const { Content, Footer } = Layout;

const DashBoardPage = ({ children }: { children: React.ReactNode }) => {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

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
