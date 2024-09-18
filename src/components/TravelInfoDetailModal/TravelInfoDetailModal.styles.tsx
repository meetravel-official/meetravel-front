import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssTravelImageStyle = css`
  width: 100%;
  aspect-ratio: 328 / 159;
  overflow: hidden;
  border: 1px solid ${COLORS.GRAY2};
  border-radius: 8px;
`;

export const cssTravelMapStyle = css`
  width: 100%;
  aspect-ratio: 2 / 1;
  border: none;
  cursor: pointer;
`;
