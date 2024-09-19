import { Outlet } from "react-router-dom";

import { Layout } from "@/components";

import { NavBar } from "../MainLayout/NavBar";
import MatchingButton from "../Matching/Matching";

export const ChatLayout = () => {
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
