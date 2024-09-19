import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssTravelImageStyle = css`
  width: 100%;
  aspect-ratio: 328 / 186;
  overflow: hidden;

  border: 1px solid ${COLORS.GRAY2};
  border-radius: 8px;
`;

export const cssTravelMapStyle = css`
  all: unset;
  cursor: pointer;

  width: 100%;
  aspect-ratio: 328 / 186;

  border: 1px solid ${COLORS.GRAY2};
  border-radius: 8px;
`;
