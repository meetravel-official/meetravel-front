import { css } from "@emotion/react";
import dayjs from "dayjs";
import { userData1 } from "dummies/chat";
import {
  useChatProfile,
  useProfileFullModal,
  useSingleReportModal,
} from "states/useChat";

import { IUserData } from "@/api/interfaces/chat";
import { ReactComponent as ReportIcon } from "@/assets/icons/report.svg";
import { Button, Image, Typography } from "@/components";
import Drawer from "@/components/Drawer/Drawer";
import { cssAlignHorizontalStyle } from "@/styles/align";
import { cssDefaultBtnStyle } from "@/styles/button";
import { COLORS } from "@/styles/color";

export interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer = ({ isOpen, onClose }: ProfileDrawerProps) => {
  const { profileData: data } = useChatProfile();
  const { handleOnOpenSingleReportModal } = useSingleReportModal();
  const { handleOnOpenProfileFullModal } = useProfileFullModal();
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div css={cssAlignHorizontalStyle({ justifyContent: "space-between" })}>
        <div css={cssAlignHorizontalStyle({ gap: 12 })}>
          <div
            css={css`
              width: 60px;
              aspect-ratio: 1/1;
              border-radius: 8px;
              background-color: ${COLORS.WHITE};
              border: 1px solid ${COLORS.GRAY2};
              overflow: hidden;
              margin-left: 12px;
            `}
          >
            <Image
              src={data?.profileImageUrl} //TODO: data.profileImg 이미지 추가 예정
              alt="profile-image"
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </div>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 4px;
            `}
          >
            <Typography size={20} weight={700} color={COLORS.GRAY5}>
              {data.nickname}
            </Typography>
            <div css={cssAlignHorizontalStyle({ gap: 4 })}>
              <Typography size={16} weight={700} color={COLORS.GRAY3}>
                {data.gender === "여성" ? "女" : "男"}
              </Typography>
              <Typography size={16} weight={400} color={COLORS.GRAY4}>
                {dayjs(data.birthDate).format("YYYY")}년생
              </Typography>
            </div>
          </div>
        </div>
        <div
          css={css`
            margin-right: 16px;
          `}
        >
          <button
            css={cssDefaultBtnStyle}
            onClick={() => {
              console.log("신고버튼 누름");
              handleOnOpenSingleReportModal();
            }}
          >
            <ReportIcon width={18} height={18} stroke={COLORS.SITUATION1} />
          </button>
        </div>
      </div>

      <div
        css={css`
          padding-top: 8px;
          backdrop-filter: blur(8px);
          position: fixed;
          width: 100%;
        `}
      >
        <div
          css={cssAlignHorizontalStyle({
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          <Button
            width={135}
            bgColor={COLORS.PINK3}
            detailStyle={css`
              border-radius: 100px;
            `}
            onClick={() => {
              console.log("프로필 더보기 버튼 누름");
              handleOnOpenProfileFullModal();
            }}
          >
            <Typography size={16} weight={700} color={COLORS.WHITE}>
              프로필 더보기
            </Typography>
          </Button>
        </div>
      </div>
      <div
        css={css`
          padding: 16px 0 0 16px;
        `}
      >
        djWJrnwjsdfsdfsdsfsdfsdfsdfsdfsdfddsfdsf
      </div>
    </Drawer>
  );
};
export default ProfileDrawer;
