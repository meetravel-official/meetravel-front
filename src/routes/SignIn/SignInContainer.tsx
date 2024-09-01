import { css } from "@emotion/react";
import KakaoLogin from "react-kakao-login";
import { useUserState } from "states/useCheckUser";

import {
  IKakaoSignInResponse,
  IKaKaoSignInResponseProfile,
} from "@/api/interfaces/kakaoSignUpInterface";
import { ReactComponent as Kakao } from "@/assets/icons/kakao.svg";
import { ReactComponent as Logo } from "@/assets/icons/logo.svg";
import { ReactComponent as TypoLogo } from "@/assets/icons/logo-typo.svg";
import { Button, Typography } from "@/components";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import {
  cssKaKaoSignInBtnStyle,
  cssSignInComponentLayoutStyle,
} from "./styles/SigninContainer.styles";

const kakaoApiKey = process.env.REACT_APP_KAKAO_API_KEY || "";

interface IKakaoError {
  error: string;
  error_description: string;
}

interface IKaKaoUserData {
  response: IKakaoSignInResponse;
  profile?: IKaKaoSignInResponseProfile;
}

export const SignInContainer = () => {
  // zustand
  const { userToken, setUserToken } = useUserState();

  const kakaoOnSuccess = (data: IKaKaoUserData) => {
    const token = data.response.access_token; // 엑세스 토큰 백엔드로 전달
    setUserToken(token);
    // navigate(pageRoutes.ROOT);
  };
  const kakaoOnFailure = (error: IKakaoError) => {
    console.error(error);
  };
  const kakaoOnLogout = () => {
    setUserToken(undefined);
  };
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
      <Button height={56} bgColor={COLORS.KAKAOYELLOW1}>
        <KakaoLogin
          className="kakao-signin-btn"
          token={kakaoApiKey}
          onSuccess={kakaoOnSuccess}
          onLogout={kakaoOnLogout}
          onFail={kakaoOnFailure}
          css={cssKaKaoSignInBtnStyle}
        >
          <div className="btn-wrapper">
            {!userToken && <Kakao fill={COLORS.GRAY5} width={20} height={20} />}
            <Typography color={COLORS.GRAY5} size={16} weight="bold">
              카톡 연동로그인
            </Typography>
          </div>
        </KakaoLogin>
      </Button>
    </div>
  );
};
