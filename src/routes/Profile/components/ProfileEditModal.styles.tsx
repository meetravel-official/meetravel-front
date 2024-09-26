import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssFormItemStyle = css`
  width: calc(100% - 2px);
  transform: translateX(1px);
`;

export const cssRadioButtonStyle = (isActive: boolean) => css`
  width: 100%;
  height: 48px;
  background-color: ${isActive ? COLORS.GRAY1 : COLORS.GRAY2};
  outline: ${isActive ? `1px solid ${COLORS.PINK3}` : "none"} !important;
  color: ${isActive ? COLORS.PINK3 : COLORS.GRAY5};
`;
