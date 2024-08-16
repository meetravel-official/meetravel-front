import { Outlet } from "react-router-dom";

import { Layout } from "../Layout/Layout";
import { CloseHeader } from "./CloseHeader";

export const CloseLayout = () => {
  return (
    <Layout>
      <Layout.Header>
        <CloseHeader />
      </Layout.Header>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};
