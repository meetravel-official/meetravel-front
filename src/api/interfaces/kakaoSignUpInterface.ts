interface IKakaoProfile {
  nickname: string;
  profile_image: string;
  thumbnail_image_url: string;
  profile_needs_agreement?: boolean;
}
export interface IKakaoSignInResponse {
  token_type: string;
  access_token: string;
  expires_in: string;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
}

export interface IKaKaoSignInResponseProfile {
  id: number;
  kakao_account?: IKakaoAccount;
  synched_at?: string;
  connected_at: string;
  properties?: IKakaoProfile;
}

export interface IKakaoAccount {
  profile: IKakaoProfile;
  email: string;
  age_range: string;
  birthday: string;
  birthyear: string;
  gender: "female" | "male";
  phone_number: string;
  ci: string;
}
