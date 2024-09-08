import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssBarStyle = css`
  all: unset;
  width: calc(100% + 32px);
  transform: translateX(-16px);
  background-color: ${COLORS.GRAY1} !important;
  height: 1px;
`;
