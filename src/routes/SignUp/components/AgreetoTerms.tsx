import { useEffect } from "react";
import { useSignUpState } from "states/useSignUp";

import { Button, Typography } from "@/components";
import Checkbox from "@/components/Checkbox/Checkbox";
import { privacyPolicyLink, termsOfUseLink } from "@/constants/link";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import {
  cssAgreetoTermsStyle,
  cssTermBtnBoxStyle,
  cssTermBtnStyle,
  cssTermCheckboxStyle,
} from "../styles/SignUpInnerContents.styles";

export const AgreetoTerms = () => {
  const {
    agreePrivacy,
    agreeTermsOfUse,
    setAgreePrivacy,
    setAgreeTermsOfUse,
    setDisabled,
  } = useSignUpState();

  const handleOnClickTerms = (type: "private" | "termsOfUse") => {
    if (type === "private") {
      window.open(privacyPolicyLink, "_target");
    } else {
      window.open(termsOfUseLink, "_target");
    }
  };

  useEffect(() => {
    if (agreePrivacy && agreeTermsOfUse) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [agreePrivacy, agreeTermsOfUse, setDisabled]);

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
    </div>
  );
};
