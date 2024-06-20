import { css } from "@emotion/react";

import { WIDTH } from "@/styles/breakpoint";
import { COLORS } from "@/styles/color";

export const cssLayoutStyle = css`
  background: ${COLORS.WHITE};
  width: 100%;
  max-width: ${WIDTH.SM};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-x: hidden;
  word-break: break-all;
  min-height: 100vh;
  margin: 0 auto;
`;

export const cssLayoutContentStyle = ({
  fixedFooterHeight,
}: {
  fixedFooterHeight?: number;
}) => css`
  padding-bottom: ${(fixedFooterHeight || 0) + 16}px;
`;

export const cssLayoutFixedFooterStyle = css`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: ${WIDTH.SM};
`;
