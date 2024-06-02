import * as Avatar from "@radix-ui/react-avatar";

import {
  cssUserAvatarImageStyle,
  cssUserAvatarRootStyle,
} from "./UserAvatar.styles";

interface UserAvatarProps {
  name?: string;
  profileUrl?: string;
  size?: number;
}

/**
 * 프로필 이미지를 표시하는 아바타 컴포넌트
 * @param name : 유저 이름
 * @param profileUrl : 유저 프로필 이미지 URL, 없을 경우 기본 이미지 표시
 * @param size : 아바타 크기
 */
export const UserAvatar = ({ name, profileUrl, size }: UserAvatarProps) => (
  <Avatar.Root css={cssUserAvatarRootStyle(size)}>
    <Avatar.Image css={cssUserAvatarImageStyle} src={profileUrl} alt={name} />
    <Avatar.Fallback css={cssUserAvatarImageStyle}>
      <svg
        width="current"
        height="current"
        viewBox="0 0 80 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M71.0838 65.1775C76.6593 58.3025 80 49.5414 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 49.5414 3.3407 58.3025 8.91624 65.1775C12.6014 54.8666 21.2712 46.9253 32.0231 44.2563C27.3922 41.5226 24.2857 36.4812 24.2857 30.7143C24.2857 22.0355 31.3212 15 40 15C48.6788 15 55.7143 22.0355 55.7143 30.7143C55.7143 36.4812 52.6078 41.5226 47.9769 44.2563C58.7288 46.9253 67.3986 54.8666 71.0838 65.1775Z"
          fill="#F1EEEF"
        />
      </svg>
    </Avatar.Fallback>
  </Avatar.Root>
);
