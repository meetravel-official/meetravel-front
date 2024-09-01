import type { ComponentType, FC } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserState } from "states/useCheckUser";

import { pageRoutes } from "@/routes";

export const checkUser = <P extends object>(
  Component: ComponentType<P>
): FC<P> => {
  return function WithComponent({ ...props }) {
    const { userToken } = useUserState();
    const navigate = useNavigate();

    useEffect(() => {
      if (userToken) {
        navigate(pageRoutes.ROOT);
      } else {
        navigate(pageRoutes.SIGN_IN);
      }
    }, [navigate, userToken]);

    return <Component {...props} />;
  };
};
