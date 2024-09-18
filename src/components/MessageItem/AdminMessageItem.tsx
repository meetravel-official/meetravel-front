import { css } from "@emotion/react";
import dayjs from "dayjs";

import { ReactComponent as LogoIcon } from "@/assets/icons/logo.svg";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { Typography } from "../Typography/Typography";
import { MessageItemProps } from ".";
import { cssMessageItemContentStyle } from "./MessageItem.styles";

const AdminMessageItem = ({ data }: MessageItemProps) => {
  return (
    <div
      className="MessageItem"
      css={cssAlignHorizontalStyle({ gap: 12, alignItems: "flex-start" })}
    >
      <LogoIcon fill={COLORS.PINK3} width={40} height={40} />

      <div css={cssAlignVerticalStyle({ gap: 8, alignItems: "flex-start" })}>
        <Typography weight={700} color={COLORS.PINK3}>
          미트래블
        </Typography>
        <div css={cssAlignHorizontalStyle({ gap: 8, alignItems: "flex-end" })}>
          <div
            className="content"
            css={cssMessageItemContentStyle(COLORS.PINK3)}
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

export default AdminMessageItem;
