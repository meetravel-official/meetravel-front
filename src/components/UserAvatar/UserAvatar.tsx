import { Image } from "@/components";

import { cssUserAvatarBoxStyle } from "./UserAvatar.styles";
interface UserAvatarProps {
  profileUrl?: string;
  size?: number;
}

/**
 * 프로필 이미지를 표시하는 아바타 컴포넌트
 * @param profileUrl : 유저 프로필 이미지 URL, 없을 경우 기본 이미지 표시
 * @param size : 아바타 크기
 */
export const UserAvatar = ({ profileUrl, size }: UserAvatarProps) => (
  <div css={cssUserAvatarBoxStyle(size)}>
    <Image
      src={profileUrl}
      alt="profile-image"
      width="100%"
      height="100%"
      objectFit="cover"
    />
  </div>
);
