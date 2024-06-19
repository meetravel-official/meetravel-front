import { NavLink } from "react-router-dom";

import { ReactComponent as ChatIcon } from "@/assets/icons/chat.svg";
import { ReactComponent as HomeIcon } from "@/assets/icons/home.svg";
import { ReactComponent as ProfileIcon } from "@/assets/icons/profile.svg";
import { ReactComponent as ShopIcon } from "@/assets/icons/shop.svg";
import { pageRoutes } from "@/routes";

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
        {navBarItem.HOME.title}
      </NavLink>
      <NavLink css={cssNavBarItemStyle} to={navBarItem.CHAT.path}>
        <ChatIcon />
        {navBarItem.CHAT.title}
      </NavLink>
      <NavLink css={cssNavBarItemStyle} to={navBarItem.SHOP.path}>
        <ShopIcon />
        {navBarItem.SHOP.title}
      </NavLink>
      <NavLink css={cssNavBarItemStyle} to={navBarItem.PROFILE.path}>
        <ProfileIcon />
        {navBarItem.PROFILE.title}
      </NavLink>
    </div>
  );
};
