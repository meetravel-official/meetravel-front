import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssChatHrStyle = css`
  border: none;
  margin: 0 0 16px;
  width: calc(100% + 32px);
  transform: translateX(-16px);
  background-color: ${COLORS.GRAY1};
  height: 1px;
`;

export const cssChatSummarizeBoxStyle = css`
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;

export const cssLinkStyle = css`
  width: 100%;
`;
