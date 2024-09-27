import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssTravelLayoutHeaderStyle = css`
  background: ${COLORS.WHITE};
  padding: 16px;
  box-sizing: border-box;
`;

export const cssAreaCodeSelectListStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
`;

export const cssContentTypeSelectListStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;
