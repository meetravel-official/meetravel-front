import { Link, Outlet } from "react-router-dom";
import { useProfile } from "states/useProfile";

import { ReactComponent as EditIcon } from "@/assets/icons/edit.svg";
import { ReactComponent as SettingIcon } from "@/assets/icons/setting.svg";
import { pageRoutes } from "@/routes";
import { cssAlignHorizontalStyle } from "@/styles/align";
import { cssDefaultBtnStyle } from "@/styles/button";
import { COLORS } from "@/styles/color";

import { Header } from "../Header/Header";
import { Layout } from "../Layout/Layout";
import { NavBar } from "../NavBar/NavBar";
import { Typography } from "../Typography/Typography";

export const ProfileLayout = () => {
  const { handleOnOpenEditModal } = useProfile();

  return (
    <Layout>
      <Layout.Header>
        <Header
          titleContent={
            <Typography color={COLORS.GRAY3} weight={700} size="20">
              프로필
            </Typography>
          }
          suffix={
            <div css={cssAlignHorizontalStyle({ gap: 16 })}>
              <button css={cssDefaultBtnStyle} onClick={handleOnOpenEditModal}>
                <EditIcon />
              </button>
              <Link to={pageRoutes.SETTING} css={cssDefaultBtnStyle}>
                <SettingIcon />
              </Link>
            </div>
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
