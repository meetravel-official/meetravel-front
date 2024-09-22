import { css } from "@emotion/react";
import { useState } from "react";

import { Button, Typography } from "@/components";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { ISignUpProps } from "../SignUpContainer";
import { cssAgreetoTermsStyle } from "../styles/SignUpInnerContents.styles";

export const RequiredPermissions = ({ step }: ISignUpProps) => {
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
      <div css={cssAlignVerticalStyle({ gap: 8, alignItems: "flex-start" })}>
        <Typography color={COLORS.GRAY3} weight="bold" size={16}>
          사진/동영상 촬영
        </Typography>
        <Button
          bgColor={COLORS.GRAY1}
          onClick={() => handleClick("private")}
          align="start"
        >
          <Typography color={COLORS.GRAY4} weight="bold" size={16}>
            카메라 권한
          </Typography>
        </Button>
        <Typography color={COLORS.GRAY3} weight="bold" size={16}>
          사진/동영상 전송
        </Typography>
        <Button
          bgColor={COLORS.GRAY1}
          onClick={() => handleClick("term")}
          align="start"
        >
          <Typography color={COLORS.GRAY4} weight="bold" size={16}>
            파일 및 미디어 권한
          </Typography>
        </Button>
      </div>
      <div className="button-to-next">
        <Button bgColor={COLORS.PINK3} onClick={step.handleOnClickNext}>
          <Typography color={COLORS.WHITE} weight="bold" size={16}>
            권한 전체 허용
          </Typography>
        </Button>
      </div>
    </div>
  );
};
