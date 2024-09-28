import { css } from "@emotion/react";
import { useSignUpState } from "states/useSignUp";

import { Button, Typography } from "@/components";
import Checkbox from "@/components/Checkbox/Checkbox";
import { privacyPolicyLink, termsOfUseLink } from "@/constants/link";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { ISignUpProps } from "../SignUpContainer";
import {
  cssAgreetoTermsStyle,
  cssTermBtnBoxStyle,
  cssTermBtnStyle,
  cssTermCheckboxStyle,
} from "../styles/SignUpInnerContents.styles";

export const AgreetoTerms = ({ step }: ISignUpProps) => {
  const { agreePrivacy, agreeTermsOfUse, setAgreePrivacy, setAgreeTermsOfUse } =
    useSignUpState();

  const handleOnClickTerms = (type: "private" | "termsOfUse") => {
    if (type === "private") {
      window.open(privacyPolicyLink, "_blank");
    } else {
      window.open(termsOfUseLink, "_blank");
    }
  };

  const handleOnClickNext = () => {
    step.handleOnClickNext();
  };

  return (
    <div css={cssAgreetoTermsStyle}>
      <div css={cssAlignVerticalStyle({ gap: 8 })}>
        <div css={cssTermBtnBoxStyle}>
          <Checkbox
            checked={agreePrivacy}
            onChange={setAgreePrivacy}
            detailStyle={cssTermCheckboxStyle}
          />
          <Button
            bgColor={COLORS.GRAY1}
            onClick={() => handleOnClickTerms("private")}
            align="start"
            link
            detailStyle={cssTermBtnStyle}
          >
            <Typography color={COLORS.GRAY4} weight="bold" size={16}>
              개인정보 수집 및 이용
            </Typography>
          </Button>
        </div>
        <div css={cssTermBtnBoxStyle}>
          <Checkbox
            checked={agreeTermsOfUse}
            onChange={setAgreeTermsOfUse}
            detailStyle={cssTermCheckboxStyle}
          />
          <Button
            bgColor={COLORS.GRAY1}
            onClick={() => handleOnClickTerms("termsOfUse")}
            align="start"
            detailStyle={cssTermBtnStyle}
            link
          >
            <Typography color={COLORS.GRAY4} weight="bold" size={16}>
              이용약관 동의
            </Typography>
          </Button>
        </div>
      </div>
      <div css={cssAlignVerticalStyle} className="button-to-next">
        <div
          css={css`
            padding: 32px;
            ${cssAlignVerticalStyle({})}
          `}
        >
          <Typography color={COLORS.GRAY4} size="12">
            *이용약관 미동의 시,
          </Typography>
          <Typography color={COLORS.GRAY4} size="12">
            미트래블 이용이 불가해요.
          </Typography>
        </div>
        <Button
          bgColor={COLORS.PINK3}
          onClick={handleOnClickNext}
          disabled={!agreePrivacy || !agreeTermsOfUse}
        >
          <Typography color={COLORS.WHITE} weight="bold" size={16}>
            다음
          </Typography>
        </Button>
      </div>
    </div>
  );
};
