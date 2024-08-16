import { Outlet } from "react-router-dom";

import { Layout } from "../Layout/Layout";
import { BackHeader } from "./BackHeader";

export const BackLayout = () => {
  return (
    <Layout>
      <Layout.Header>
        <BackHeader />
      </Layout.Header>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};
