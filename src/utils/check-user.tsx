import Cookies from "js-cookie";
import type { ComponentType, FC } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { pageRoutes } from "@/routes";

export const checkUser = <P extends object>(
  Component: ComponentType<P>
): FC<P> => {
  return function WithComponent({ ...props }) {
    const userToken = Cookies.get("accessToken");
    const navigate = useNavigate();

    useEffect(() => {
      if (userToken) {
        return;
      } else {
        navigate(pageRoutes.SIGN_IN);
      }
    }, [navigate, userToken]);

    return <Component {...props} />;
  };
};
