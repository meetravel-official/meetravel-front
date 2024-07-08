import { Outlet } from "react-router-dom";

import { Layout } from "@/components";

import { NavBar } from "./NavBar";

export const MainLayout = () => {
  return (
    <Layout>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
      <Layout.FixedFooter>
        <NavBar />
      </Layout.FixedFooter>
    </Layout>
  );
};
