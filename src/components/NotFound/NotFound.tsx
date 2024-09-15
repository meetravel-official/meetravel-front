import { css, SerializedStyles } from "@emotion/react";

import { ReactComponent as NotFoundIcon } from "@/assets/icons/logo-404.svg";
import { COLORS } from "@/styles/color";

import { Typography } from "../Typography/Typography";

interface INotFound {
  mainText?: React.ReactNode | string;
  subText?: React.ReactNode | string;
  children?: React.ReactNode;
  detailStyle?: SerializedStyles;
}

const NotFound = ({ mainText, subText, detailStyle, children }: INotFound) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px 0px;
        ${detailStyle}
      `}
    >
      <NotFoundIcon
        css={css`
          margin-bottom: 12px;
        `}
      />
      {typeof mainText === "string" ? (
        <Typography size="16" weight="bold" color={COLORS.GRAY4}>
          {mainText}
        </Typography>
      ) : (
        mainText
      )}
      {typeof subText === "string" ? (
        <Typography size="12" color={COLORS.GRAY3}>
          {subText}
        </Typography>
      ) : (
        subText
      )}
      {children}
    </div>
  );
};
export default NotFound;
