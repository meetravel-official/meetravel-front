import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";

import { COLORS } from "@/styles/color";

import { Header } from "../Header/Header";
import { Layout } from "../Layout/Layout";
import { NavBar } from "../NavBar/NavBar";
import { Typography } from "../Typography/Typography";

export const ChatListLayout = () => {
  return (
    <Layout>
      <Layout.Header>
        <Header
          titleContent={
            <Typography size="20" weight="bold" color={COLORS.GRAY3}>
              채팅방
            </Typography>
          }
          detailStyle={css`
            border-bottom: 1px solid ${COLORS.GRAY1};
          `}
        />
      </Layout.Header>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
      <Layout.FixedFooter>
        <NavBar />
      </Layout.FixedFooter>
    </Layout>
  );
};
