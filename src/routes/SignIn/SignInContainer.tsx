import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { useKakaoAuthState } from "states/useCheckUser";
import { checkUser } from "utils/check-user";

import { KAKAO_CLIENT_ID, KAKAO_REDIRECT_URI } from "@/api/hosts";
import { ReactComponent as KakaoLogo } from "@/assets/icons/kakao-logo.svg";
import { ReactComponent as Logo } from "@/assets/icons/logo.svg";
import { ReactComponent as TypoLogo } from "@/assets/icons/logo-typo.svg";
import { Button, Typography } from "@/components";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { cssSignInComponentLayoutStyle } from "./styles/SigninContainer.styles";

export const SignInContainer = checkUser(() => {
  const { setRequestToKakao } = useKakaoAuthState();

  return (
    <div
      css={css`
        ${cssAlignVerticalStyle({
          justifyContent: "space-between",
        })};
        ${cssSignInComponentLayoutStyle}
      `}
    >
      <div
        className="logo-wrapper"
        css={cssAlignVerticalStyle({
          gap: 12,
        })}
      >
        <Logo fill={COLORS.PINK3} width="120px" height="120px" />
        <div
          className="typo-logo-wrapper"
          css={cssAlignVerticalStyle({
            gap: 0,
          })}
        >
          <TypoLogo fill={COLORS.PINK3} width="141px" height="36px" />
          <Typography color={COLORS.GRAY4} size={14}>
            일상 속에 없던 만남
          </Typography>
        </div>
      </div>

      <a
        href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`}
        className="kakao-sign-in-link"
        onClick={() => setRequestToKakao(true)}
        target="_self"
      >
        <Button
          height={56}
          bgColor={COLORS.KAKAOYELLOW4}
          color={COLORS.GRAY5}
          detailStyle={css`
            border-radius: 12px;
          `}
        >
          <KakaoLogo width={20} height={20} />
          <Typography>카카오 로그인</Typography>
        </Button>
      </a>
    </div>
  );
});
