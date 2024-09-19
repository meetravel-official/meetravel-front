import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useKakaoAuthState } from "states/useCheckUser";

import { usePostKakaoLogin } from "@/api/hooks/auth";

export const KaKaoAuthCheckContainer = () => {
  const [searchParams] = useSearchParams();
  const kakaoAuthCode = searchParams.get("code") || undefined;

  const { requestToKakao } = useKakaoAuthState();

  const mutationKakaoLogin = usePostKakaoLogin();

  useEffect(() => {
    if (kakaoAuthCode && requestToKakao) {
      mutationKakaoLogin.mutate(kakaoAuthCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestToKakao]);

  return <div>카카오 로그인 처리중입니다.</div>;
};