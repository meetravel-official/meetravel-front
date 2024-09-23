import { NavLink } from "react-router-dom";

import { ReactComponent as ChatIcon } from "@/assets/icons/chat.svg";
import { ReactComponent as HomeIcon } from "@/assets/icons/home.svg";
import { ReactComponent as InfoIcon } from "@/assets/icons/info.svg";
import { ReactComponent as ProfileIcon } from "@/assets/icons/profile.svg";
import { Typography } from "@/components";
import { pageRoutes } from "@/routes";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { cssNavBarItemStyle, cssNavBarStyle } from "./NavBar.styles";

export const NavBar = () => {
  const navBarItem = {
    HOME: { title: "홈", path: pageRoutes.ROOT },
    CHAT: {
      title: "채팅방",
      path: pageRoutes.CHAT,
    },
    TRAVEL_INFO: {
      title: "여행 정보",
      path: pageRoutes.TRAVEL_INFO,
    },
    PROFILE: { title: "프로필", path: pageRoutes.PROFILE },
  };

  return (
    <div css={cssNavBarStyle}>
      <NavLink css={cssNavBarItemStyle} to={navBarItem.HOME.path}>
        <div css={cssAlignVerticalStyle({ gap: 4 })}>
          <HomeIcon />
          <Typography size="12" weight="bold" color={COLORS.GRAY2}>
            {navBarItem.HOME.title}
          </Typography>
        </div>
      </NavLink>
      <NavLink css={cssNavBarItemStyle} to={navBarItem.TRAVEL_INFO.path}>
        <div css={cssAlignVerticalStyle({ gap: 4 })}>
          <InfoIcon />
          <Typography size="12" weight="bold" color={COLORS.GRAY2}>
            {navBarItem.TRAVEL_INFO.title}
          </Typography>
        </div>
      </NavLink>
      <NavLink css={cssNavBarItemStyle} to={navBarItem.CHAT.path}>
        <div css={cssAlignVerticalStyle({ gap: 4 })}>
          <ChatIcon />
          <Typography size="12" weight="bold" color={COLORS.GRAY2}>
            {navBarItem.CHAT.title}
          </Typography>
        </div>
      </NavLink>
      <NavLink css={cssNavBarItemStyle} to={navBarItem.PROFILE.path}>
        <div css={cssAlignVerticalStyle({ gap: 4 })}>
          <ProfileIcon />
          <Typography size="12" weight="bold" color={COLORS.GRAY2}>
            {navBarItem.PROFILE.title}
          </Typography>
        </div>
      </NavLink>
    </div>
  );
};
