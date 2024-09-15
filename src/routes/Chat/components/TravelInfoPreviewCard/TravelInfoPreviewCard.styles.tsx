import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssTravelInfoPreviewCardStyle = css`
  cursor: pointer;
  background: ${COLORS.WHITE};
  border: 1px solid ${COLORS.GRAY2};
  border-radius: 8px;
  width: 196px;
  padding: 0;
  overflow: hidden;
`;

export const cssTravelInfoPreviewCardImageStyle = css`
  width: 100%;
  aspect-ratio: 196 / 80;
  border-bottom: 1px solid ${COLORS.GRAY2};
`;

export const cssTravelInfoPreviewCardBodyStyle = css`
  width: 100%;
  padding: 12px;

  display: flex;
  flex-direction: column;
  gap: 4px;

  .typography {
    width: calc(100% - 24px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
