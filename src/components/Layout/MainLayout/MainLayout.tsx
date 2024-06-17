import { Outlet } from "react-router-dom";

import { cssMainLayoutStyle } from "./MainLayout.styles";

export const MainLayout = () => {
  return (
    <div css={cssMainLayoutStyle}>
      <main>
        <Outlet />
      </main>
      <footer>푸터</footer>
    </div>
  );
};
