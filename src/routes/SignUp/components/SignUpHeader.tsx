import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as ArrowLeft } from "@/assets/icons/arrow-left.svg";
import { ReactComponent as Cross } from "@/assets/icons/cross.svg";
import { Button } from "@/components";
import { StepInstance } from "@/components/Step/StepInterface";
import { pageRoutes } from "@/routes";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { cssSignUpHeaderStyle } from "../styles/SignUpInnerContents.styles";

interface ISignUpHeaderProps {
  step: StepInstance;
  headerContent: React.ReactNode;
}
export const SignUpHeader = ({ step, headerContent }: ISignUpHeaderProps) => {
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
      <div css={cssAlignHorizontalStyle({ justifyContent: "space-between" })}>
        <div css={cssAlignVerticalStyle({ alignItems: "flex-start" })}>
          {headerContent}
        </div>
        {step.isFirst ? (
          <Button
            icon={<Cross />}
            height="unset"
            width="unset"
            bgColor="unset"
            onClick={handleNavigation}
          />
        ) : (
          <Button
            icon={<ArrowLeft stroke={COLORS.GRAY3} />}
            height="unset"
            width="unset"
            bgColor="unset"
            onClick={step.handleOnClickPrev}
          />
        )}
      </div>
    </div>
  );
};
