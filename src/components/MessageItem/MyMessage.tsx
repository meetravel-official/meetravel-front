import { css } from "@emotion/react";
import dayjs from "dayjs";

import { cssAlignHorizontalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { Typography } from "../Typography/Typography";
import { MessageItemProps } from ".";

const MyMessage = ({ data }: MessageItemProps) => {
  return (
    <div css={css``}>
      <div
        css={cssAlignHorizontalStyle({
          gap: 8,
          alignItems: "flex-end",
          justifyContent: "flex-end",
        })}
      >
        <Typography
          size={12}
          color={COLORS.GRAY3}
          detailStyle={css`
            flex-shrink: 0;
          `}
        >
          {dayjs(data.sendAt).format("HH:mm")}
        </Typography>
        <div
          className="content"
          css={css`
            background-color: ${COLORS.PINK1};
            padding: 12px;
            border-radius: 8px;
            border: 1px solid ${COLORS.GRAY2};
          `}
        >
          <Typography size={14} color={COLORS.GRAY5}>
            {data.message}
          </Typography>
        </div>
      </div>
    </div>
  );
};
export default MyMessage;
