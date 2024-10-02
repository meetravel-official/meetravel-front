import { css } from "@emotion/react";
import * as Popover from "@radix-ui/react-popover";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

import { ReactComponent as CameraIcon } from "@/assets/icons/camera.svg";
import { Image as ImageComponent, Typography } from "@/components";
import { cssDefaultBtnStyle } from "@/styles/button";
import { COLORS } from "@/styles/color";

import {
  cssEditProfileImgBoxStyle,
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
    <ImageComponent
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

  const resizeImage = (
    file: File,
    maxWidth: number,
    maxHeight: number
  ): Promise<File> => {
    return new Promise((resolve, reject) => {
      // 새로운 이미지 html element를 만든다.
      const img = new Image();
      // 그래픽을 사용할때 쓰는 canvas태그를 만든다.
      const canvas = document.createElement("canvas");
      // 2d render
      const ctx = canvas.getContext("2d");
      // blob 주소 생성
      img.src = URL.createObjectURL(file);
      // img 요소가 준비된 후 리사이징 실행.
      img.onload = () => {
        // 기존 이미지의 width, height
        let width = img.width;
        let height = img.height;
        // 최대 width 값보다 크다면 줄여야 하는 비율 만큼 height를 줄이고 width에 maxWidth를 할당.
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
        // 최대 height 값보다 크다면 줄여야 하는 비율 만큼 width를 줄이고 height에 maxHeight를 할당.
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
        // 조절한 width, height를 canvas에
        canvas.width = width;
        canvas.height = height;
        // canvas에 이미지를 그린다.
        ctx?.drawImage(img, 0, 0, width, height);
        // canvas가 포함한 이미지를 Blob 객체로 만든다.
        canvas.toBlob((resizedImage: Blob | null) => {
          if (resizedImage) {
            const resizedFile = new File([resizedImage], file.name, {
              type: file.type,
            });

            resolve(resizedFile);
          } else {
            reject(new Error("Failed to resize image"));
          }
        });
        // 에러의 경우
        img.onerror = () => {
          reject(new Error("Failed to resize image"));
        };
      };
    });
  };

  const handleOnChangeInput = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleOnClosePopOver();
    if (e.target.files && e.target.files.length > 0) {
      try {
        const reader = new FileReader();
        const resizedFile = await resizeImage(e.target.files[0], 100, 100);
        reader.readAsDataURL(resizedFile);

        return new Promise(() => {
          reader.onload = () => {
            setFileUrl(reader.result as string);
            onChange(resizedFile);
          };
        });
      } catch (error) {
        toast.error("이미지 업로드에 실패했습니다.");
        setFileUrl("");
        onChange(undefined);
      }
    }
  };

  const handleOnClickDelete = () => {
    setFileUrl("");
    onChange(undefined);
    handleOnClosePopOver();
  };

  const handleOnClickUpload = () => {
    inputRef.current?.click();
  };

  return (
    <div css={cssEditProfileImgBoxStyle}>
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
