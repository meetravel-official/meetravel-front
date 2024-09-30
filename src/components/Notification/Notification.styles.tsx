import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssNotificationStyle = ({
  read,
  active,
}: {
  read?: boolean;
  active?: boolean;
}) => css`
  box-sizing: border-box;
  width: 100%;

  background: ${read ? COLORS.GRAY2 : COLORS.WHITE};
  border: 1px solid ${active ? COLORS.PINK3 : COLORS.GRAY3};
  border-radius: 8px;
  padding: 12px 16px;
`;

export const cssNotificationTitleStyle = css`
  width: 85%;
  .typography {
    word-break: keep-all;
  }
`;

export const cssNotificationLinkStyle = css`
  all: unset;
  cursor: pointer;
  width: 100%;
`;

export const cssNotificationWrapperStyle = css`
  width: 100%;
`;
