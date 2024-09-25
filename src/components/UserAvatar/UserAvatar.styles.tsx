import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssUserAvatarBoxStyle = (size?: number) => css`
  width: ${size || 40}px;
  height: auto;
  aspect-ratio: 1/1;
  border-radius: 8px;
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.GRAY2};
  overflow: hidden;
`;
