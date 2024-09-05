import { css } from "@emotion/react";

import { Button, Typography } from "@/components";
import { StepProps } from "@/components/Step/StepInterface";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { cssAgreetoTermsStyle } from "../styles/SignUpInnerContents.styles";

export const AgreetoTerms = ({ step }: Pick<StepProps, "step">) => {
  const handleClick = () => {
    window.alert("약관 모달 띄우기");
  };
  return (
    <div
      css={css`
        ${cssAlignVerticalStyle({
          justifyContent: "space-between",
          alignItems: "space-between",
        })}
        ${cssAgreetoTermsStyle}
      `}
    >
      <div css={cssAlignVerticalStyle({ gap: 8 })}>
        <Button bgColor={COLORS.GRAY1} onClick={handleClick} align="start" link>
          <input type="checkbox" /> {/* TODO */}
          <Typography color={COLORS.GRAY4} weight="bold" size={16}>
            개인정보 수집 및 이용
          </Typography>
        </Button>
        <Button bgColor={COLORS.GRAY1} onClick={handleClick} align="start" link>
          <input type="checkbox" /> {/* TODO */}
          <Typography color={COLORS.GRAY4} weight="bold" size={16}>
            이용약관 동의
          </Typography>
        </Button>
      </div>
    </div>
  );
};
