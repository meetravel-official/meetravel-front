import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Cross } from "@/assets/icons/cross.svg";
import { Button } from "@/components";
import { pageRoutes } from "@/routes";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";

import { cssSignUpHeaderStyle } from "../styles/SignUpInnerContents.styles";

interface ISignUpHeaderProps {
  headerContent: React.ReactNode;
}
export const SignUpHeader = ({ headerContent }: ISignUpHeaderProps) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(pageRoutes.SIGN_IN, { replace: true });
  };

  return (
    <div
      className="signup-header"
      css={css`
        ${cssSignUpHeaderStyle}
      `}
    >
      <div
        css={cssAlignHorizontalStyle({
          justifyContent: "space-between",
          alignItems: "flex-start",
        })}
      >
        <div css={cssAlignVerticalStyle({ gap: 32, alignItems: "flex-start" })}>
          <div>{headerContent}</div>
        </div>
        <Button
          icon={<Cross width={16} height={16} />}
          height="unset"
          width="unset"
          bgColor="unset"
          onClick={handleNavigation}
          detailStyle={css`
            padding: 0;
          `}
        />
      </div>
    </div>
  );
};
