import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssBarStyle = css`
  position: block;
  width: calc(100% + 32px);
  transform: translateX(-16px);
  border-color: ${COLORS.GRAY1};
  margin: 0;
`;
