import { Link } from "react-router-dom";

import { UserAvatar } from "@/components";

import { pageRoutes } from "..";

export const MainContainer = () => {
  return (
    <div>
      <UserAvatar size={84} />
      <UserAvatar
        profileUrl="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
        name="Pedro Duarte"
      />
      <Link to={pageRoutes.SAMPLE}>샘플 페이지로</Link>
    </div>
  );
};
