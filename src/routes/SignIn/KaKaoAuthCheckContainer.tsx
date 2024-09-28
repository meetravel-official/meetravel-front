import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useKakaoAuthState } from "states/useCheckUser";
import { setUserDataToCookie } from "utils/token-utils";

import { usePostKakaoLogin } from "@/api/hooks/auth";
import { KAKAO_REDIRECT_URI } from "@/api/hosts";

import { pageRoutes } from "..";

export const KaKaoAuthCheckContainer = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const kakaoAuthCode = searchParams.get("code") || undefined;

  const { requestToKakao, setRequestToKakao } = useKakaoAuthState();

  const mutationKakaoLogin = usePostKakaoLogin();

  useEffect(() => {
    if (kakaoAuthCode && requestToKakao) {
      mutationKakaoLogin.mutate(
        {
          authorizationCode: kakaoAuthCode,
          redirectUri: KAKAO_REDIRECT_URI,
        },
        {
          onSuccess: (data) => {
            const response = data;
            setRequestToKakao(false);
            setUserDataToCookie(response);

            if (response.registeredUserYn) {
              navigate(pageRoutes.ROOT);
            } else {
              navigate(pageRoutes.SIGN_UP);
            }
          },
          onError: (error) => {
            toast.error("로그인에 실패했습니다.");
            console.error("Kakao SignIn is Failed.", error);
            setRequestToKakao(false);
            navigate(pageRoutes.SIGN_IN);
          },
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestToKakao]);

  return <div>카카오 로그인 처리중입니다.</div>;
};
