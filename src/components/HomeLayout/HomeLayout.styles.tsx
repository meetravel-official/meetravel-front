import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssHomeHeaderStyle = css`
  background: ${COLORS.WHITE};
  padding: 16px;
  box-sizing: border-box;
`;

export const cssHomeHeaderLinkBoxStyle = css`
  position: relative;
`;

export const cssHomeHeaderLinkStyle = css`
  all: unset;
  cursor: pointer;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 55;
`;

export const cssAreaCodeListStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;
