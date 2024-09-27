import { css } from "@emotion/react";
import dayjs from "dayjs";

import { cssAlignHorizontalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { Typography } from "../Typography/Typography";
import { MessageItemProps } from ".";

const AddMessage = ({ data }: MessageItemProps) => {
  return (
    <div
      css={css`
        margin-left: 48px;
      `}
    >
      <div css={cssAlignHorizontalStyle({ gap: 8, alignItems: "flex-end" })}>
        <div
          className="content"
          css={css`
            background-color: white;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid ${COLORS.GRAY2};
          `}
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
  );
};
export default AddMessage;
