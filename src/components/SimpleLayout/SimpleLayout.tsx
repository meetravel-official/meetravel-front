import { Outlet } from "react-router-dom";

import { Layout } from "../Layout/Layout";

export const SimpleLayout = () => {
  return (
    <Layout>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};
