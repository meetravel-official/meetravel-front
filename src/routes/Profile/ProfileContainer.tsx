import { useState } from "react";

// import type KakaoError from "react-kakao-login";
import {
  IKakaoSignInResponse,
  IKaKaoSignInResponseProfile,
} from "@/api/interfaces/kakaoSignUpInterface";
import { Typography } from "@/components";
import { cssAlignVerticalStyle } from "@/styles/align";
export const ProfileContainer = () => {
  const [userInfo, setUserInfo] = useState<any>();

  const kakaoApiKey = "b6a7e7bef559fca526d13c618f9b1082";
  const kakaoOnSuccess = (data: {
    response: IKakaoSignInResponse;
    profile?: IKaKaoSignInResponseProfile;
  }) => {
    setUserInfo(data);
    const idToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달
  };
  const kakaoOnFailure = (error: any) => {
    setUserInfo(error);
    // console.log(error);
  };

  return (
    <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
      <Typography>프로필</Typography>
      <div>
        프로필
        <KakaoLogin
          token={kakaoApiKey}
          onSuccess={kakaoOnSuccess}
          onFail={kakaoOnFailure}
        />
        {userInfo}
      </div>
    </div>
  );
};
