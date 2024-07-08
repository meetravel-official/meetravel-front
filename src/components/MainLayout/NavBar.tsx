import { NavLink } from "react-router-dom";

import { ReactComponent as ChatIcon } from "@/assets/icons/chat.svg";
import { ReactComponent as HomeIcon } from "@/assets/icons/home.svg";
import { ReactComponent as ProfileIcon } from "@/assets/icons/profile.svg";
import { ReactComponent as ShopIcon } from "@/assets/icons/shop.svg";
import { Typography } from "@/components";
import { pageRoutes } from "@/routes";
import { COLORS } from "@/styles/color";

import { cssNavBarItemStyle, cssNavBarStyle } from "./NavBar.styles";

export const NavBar = () => {
  const navBarItem = {
    HOME: { title: "홈", path: pageRoutes.ROOT },
    CHAT: {
      title: "채팅방",
      path: pageRoutes.CHAT,
    },
    SHOP: { title: "샵", path: pageRoutes.SHOP },
    PROFILE: { title: "프로필", path: pageRoutes.PROFILE },
  };

  return (
    <div css={cssNavBarStyle}>
      <NavLink css={cssNavBarItemStyle} to={navBarItem.HOME.path}>
        <HomeIcon />
        <Typography size="12" weight="bold" color={COLORS.GRAY2}>
          {navBarItem.HOME.title}
        </Typography>
      </NavLink>
      <NavLink css={cssNavBarItemStyle} to={navBarItem.CHAT.path}>
        <ChatIcon />
        <Typography size="12" weight="bold" color={COLORS.GRAY2}>
          {navBarItem.CHAT.title}
        </Typography>
      </NavLink>
      <NavLink css={cssNavBarItemStyle} to={navBarItem.SHOP.path}>
        <ShopIcon />
        <Typography size="12" weight="bold" color={COLORS.GRAY2}>
          {navBarItem.SHOP.title}
        </Typography>
      </NavLink>
      <NavLink css={cssNavBarItemStyle} to={navBarItem.PROFILE.path}>
        <ProfileIcon />
        <Typography size="12" weight="bold" color={COLORS.GRAY2}>
          {navBarItem.PROFILE.title}
        </Typography>
      </NavLink>
    </div>
  );
};
