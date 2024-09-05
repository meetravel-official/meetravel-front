import { css } from "@emotion/react";

import { ReactComponent as Cross } from "@/assets/icons/cross.svg";
import { Header, Typography } from "@/components";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { cssSignUpHeaderStyle } from "../styles/SignUpInnerContents.styles";

export const SignUpHeader = () => {
  return (
    <div className="signup-header">
      <Header
        titleContent={
          <div
            css={css`
              ${cssAlignVerticalStyle({ alignItems: "flex-start" })}
              ${cssSignUpHeaderStyle}
            `}
          >
            <Typography color={COLORS.GRAY4} size={20} weight="bold">
              미트래블을 이용하기 위해선
            </Typography>
            <Typography color={COLORS.GRAY4} size={20} weight="bold">
              <Typography color={COLORS.PINK2} size={20} weight="bold">
                이용 약관 동의
              </Typography>
              가 필요해요.
            </Typography>
          </div>
        }
        suffix={
          <Cross
            onClick={() => window.alert("안닫히지롱")}
            css={css`
              cursor: pointer;
            `}
          />
        }
      />
    </div>
  );
};
