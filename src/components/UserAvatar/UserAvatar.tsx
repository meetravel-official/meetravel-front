import { css } from "@emotion/react";
import * as Popover from "@radix-ui/react-popover";
import { useRef, useState } from "react";

import { ReactComponent as CameraIcon } from "@/assets/icons/camera.svg";
import { Image, Typography } from "@/components";
import { cssDefaultBtnStyle } from "@/styles/button";
import { COLORS } from "@/styles/color";

import {
  cssEditProfileImgButtonStyle,
  cssPopOverContentStyle,
  cssUserAvatarBoxStyle,
} from "./UserAvatar.styles";
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

export const UserAvatarUpload = ({
  defaultProfileUrl,
  onChange,
}: {
  defaultProfileUrl?: string;
  onChange: (file?: File) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | undefined>(
    defaultProfileUrl || ""
  );

  const handleOnOpenPopOver = () => {
    setIsOpenPopover(true);
  };

  const handleOnClosePopOver = () => {
    setIsOpenPopover(false);
  };

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      return new Promise(() => {
        reader.onload = () => {
          setFileUrl(reader.result as string);
          onChange(e.target.files?.[0]);
        };
      });
    }
    handleOnClosePopOver();
  };

  const handleOnClickDelete = () => {
    setFileUrl("");
    onChange(undefined);
  };

  const handleOnClickUpload = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <UserAvatar profileUrl={fileUrl} size={80} />
      <input
        css={css`
          display: none;
        `}
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleOnChangeInput}
      />
      <Popover.Root open={isOpenPopover}>
        <Popover.Trigger asChild>
          <button
            css={cssEditProfileImgButtonStyle}
            onClick={handleOnOpenPopOver}
          >
            <CameraIcon />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            css={cssPopOverContentStyle}
            onInteractOutside={handleOnClosePopOver}
          >
            <button css={cssDefaultBtnStyle} onClick={handleOnClickDelete}>
              <Typography color={COLORS.GRAY4} weight={700} size="16">
                이미지 삭제
              </Typography>
            </button>
            <button css={cssDefaultBtnStyle} onClick={handleOnClickUpload}>
              <Typography color={COLORS.GRAY4} weight={700} size="16">
                업로드
              </Typography>
            </button>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};

UserAvatar.Upload = UserAvatarUpload;
