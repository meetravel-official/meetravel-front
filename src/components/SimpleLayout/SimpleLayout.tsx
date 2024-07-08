import { Outlet } from "react-router-dom";

import { Layout } from "@/components";

export const SimpleLayout = () => {
  return (
    <Layout>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};
