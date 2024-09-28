import { css } from "@emotion/react";
import { useReportReasonModal } from "states/useChat";

import { IUserDetailData } from "@/api/interfaces/chat";
import { Button, Image, Typography } from "@/components";
import { cssAlignHorizontalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

const UserItem = ({ data }: { data: IUserDetailData }) => {
  const { isOpenReportReasonModal, handleOnOpenReportReasonModal } =
    useReportReasonModal();
  return (
    <Button
      onClick={() => {
        console.log("신고 프로필 버튼을 누름");
        console.log(isOpenReportReasonModal);
        handleOnOpenReportReasonModal();
      }}
      detailStyle={css`
        height: 52px;
        border-radius: 4px;
        justify-content: flex-start;
        padding: 8px 12px;
      `}
    >
      <div css={cssAlignHorizontalStyle({ gap: 8 })}>
        <div
          css={css`
            width: 36px;
            aspect-ratio: 1/1;
            border-radius: 8px;
            background-color: ${COLORS.WHITE};
            border: 1px solid ${COLORS.GRAY2};
            overflow: hidden;
          `}
        >
          <Image
            src={data.profileImageUrl}
            alt="profile-image"
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </div>
        <div
          css={css`
            display: flex;
            gap: 4px;
          `}
        >
          <Typography size={16} weight={700} color={COLORS.GRAY3}>
            {data.gender === "여성" ? "女" : "男"}
          </Typography>
          <Typography size={16} weight={700} color={COLORS.GRAY5}>
            {data.nickname}
          </Typography>
        </div>
      </div>
    </Button>
  );
};
export default UserItem;
