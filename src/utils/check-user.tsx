import Cookies from "js-cookie";
import type { ComponentType, FC } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { pageRoutes } from "@/routes";

export const checkUser = <P extends object>(
  Component: ComponentType<P>
): FC<P> => {
  return function WithComponent({ ...props }) {
    const userToken = Cookies.get("accessToken");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      if (userToken) {
        if (location.pathname === pageRoutes.SIGN_IN) {
          navigate(pageRoutes.ROOT);
        }
        return;
      } else {
        navigate(pageRoutes.SIGN_IN);
      }
    }, [location.pathname, navigate, userToken]);

    return <Component {...props} />;
  };
};
