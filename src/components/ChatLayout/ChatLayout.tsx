import { Outlet } from "react-router-dom";

import { Layout } from "@/components";

import MatchingButton from "../Matching/Matching";
import { NavBar } from "../NavBar/NavBar";

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
