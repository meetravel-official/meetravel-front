import { css } from "@emotion/react";
import dayjs from "dayjs";

import { Image } from "@/components";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { Typography } from "../Typography/Typography";
import { MessageItemProps } from ".";
import { cssMessageItemContentStyle } from "./MessageItem.styles";

const UserMessageItem = ({ data }: MessageItemProps) => {
  return (
    <div
      className="MessageItem"
      css={cssAlignHorizontalStyle({ gap: 12, alignItems: "flex-start" })}
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
          src={data.profileImg ?? ""}
          alt="profile-image"
          width="100%"
          height="100%"
          objectFit="cover"
        />
      </div>
      <div css={cssAlignVerticalStyle({ gap: 8, alignItems: "flex-start" })}>
        <Typography weight={700} color={COLORS.GRAY4}>
          {data.name ?? "익명"}
        </Typography>
        <div css={cssAlignHorizontalStyle({ gap: 8, alignItems: "flex-end" })}>
          <div
            className="content"
            css={cssMessageItemContentStyle(COLORS.GRAY2)}
          >
            <Typography size={14} color={COLORS.GRAY5}>
              {data.content}
            </Typography>
          </div>
          <Typography
            size={12}
            color={COLORS.GRAY3}
            detailStyle={css`
              flex-shrink: 0;
            `}
          >
            {dayjs(data.regDate).format("HH:mm")}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default UserMessageItem;
