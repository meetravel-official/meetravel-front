import { css } from "@emotion/react";
import { useState } from "react";

import { Button, Typography } from "@/components";
import Checkbox from "@/components/Checkbox/Checkbox";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { ISignUpProps } from "../SignUpContainer";
import { cssAgreetoTermsStyle } from "../styles/SignUpInnerContents.styles";

export const AgreetoTerms = ({ step }: ISignUpProps) => {
  const [checked, setChecked] = useState({ private: false, term: false });
  const handleClick = (type: string) => {
    if (type === "private") {
      setChecked((prev) => ({ ...prev, private: !checked.private }));
    } else {
      setChecked((prev) => ({ ...prev, term: !checked.term }));
    }
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
        <Button
          bgColor={COLORS.GRAY1}
          onClick={() => handleClick("private")}
          align="start"
          link
        >
          <Checkbox checked={checked.private} />
          <Typography color={COLORS.GRAY4} weight="bold" size={16}>
            개인정보 수집 및 이용
          </Typography>
        </Button>
        <Button
          bgColor={COLORS.GRAY1}
          onClick={() => handleClick("term")}
          align="start"
          link
        >
          <Checkbox checked={checked.term} />
          <Typography color={COLORS.GRAY4} weight="bold" size={16}>
            이용약관 동의
          </Typography>
        </Button>
      </div>
      <div className="button-to-next">
        <Button bgColor={COLORS.PINK3} onClick={step.handleOnClickNext}>
          <Typography color={COLORS.WHITE} weight="bold" size={16}>
            약관 전체 허용
          </Typography>
        </Button>
      </div>
    </div>
  );
};
