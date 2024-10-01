import { css } from "@emotion/react";
import dayjs from "dayjs";
import { useChatProfile, useChatUsers, useProfileModal } from "states/useChat";

import { Image } from "@/components";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { cssDefaultBtnStyle } from "@/styles/button";
import { COLORS } from "@/styles/color";

import { Typography } from "../Typography/Typography";
import { MessageItemProps } from ".";
import { cssMessageItemContentStyle } from "./MessageItem.styles";

const UserMessageItem = ({ data }: MessageItemProps) => {
  const { handleOnOpenProfileModal } = useProfileModal();
  const { setProfileData } = useChatProfile();
  const { chatUsersData } = useChatUsers();
  const newProfileData = chatUsersData?.joinedUsers.find(
    (user) => user.userId === data.userId
  );

  return (
    <div
      className="MessageItem"
      css={cssAlignHorizontalStyle({ gap: 12, alignItems: "flex-start" })}
    >
      <button
        css={css`
          all: unset;
          cursor: pointer;
          width: 40px;
        `}
        onClick={() => {
          console.log("프로필 버튼을 누름");

          if (newProfileData) {
            setProfileData(newProfileData);
            handleOnOpenProfileModal();
          }
        }}
      >
        <div
          css={css`
            width: 40px;
            aspect-ratio: 1/1;
            border-radius: 8px;
            background-color: ${COLORS.WHITE};
            border: 1px solid ${COLORS.GRAY2};
            overflow: hidden;
          `}
        >
          <Image
            src={newProfileData?.profileImageUrl ?? ""}
            alt="profile-image"
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </div>
      </button>
      <div css={cssAlignVerticalStyle({ gap: 8, alignItems: "flex-start" })}>
        <Typography weight={700} color={COLORS.GRAY4}>
          {newProfileData?.nickname ?? "알수없는 사용자"}
        </Typography>
        <div css={cssAlignHorizontalStyle({ gap: 8, alignItems: "flex-end" })}>
          <div
            className="content"
            css={cssMessageItemContentStyle(COLORS.GRAY2)}
          >
            <Typography size={14} color={COLORS.GRAY5}>
              {data.message}
            </Typography>
          </div>
          <Typography
            size={12}
            color={COLORS.GRAY3}
            detailStyle={css`
              flex-shrink: 0;
            `}
          >
            {dayjs(data.sendAt).format("HH:mm")}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default UserMessageItem;
