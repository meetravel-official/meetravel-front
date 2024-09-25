import { Outlet } from "react-router-dom";

import { ReactComponent as SettingIcon } from "@/assets/icons/setting.svg";
import { cssDefaultBtnStyle } from "@/styles/button";
import { COLORS } from "@/styles/color";

import { Header } from "../Header/Header";
import { Layout } from "../Layout/Layout";
import { NavBar } from "../NavBar/NavBar";
import { Typography } from "../Typography/Typography";

export const ProfileLayout = () => {
  return (
    <Layout>
      <Layout.Header>
        <Header
          titleContent={
            <Typography color={COLORS.GRAY3} weight={700} size="20">
              마이 페이지
            </Typography>
          }
          suffix={
            <button css={cssDefaultBtnStyle}>
              <SettingIcon />
            </button>
          }
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
