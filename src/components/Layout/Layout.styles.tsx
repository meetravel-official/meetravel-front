import { css } from "@emotion/react";

import { WIDTH } from "@/styles/breakpoint";
import { COLORS } from "@/styles/color";

import { FixedHeight } from "./Layout";

export const cssLayoutStyle = css`
  background: ${COLORS.WHITE};
  width: 100%;
  max-width: ${WIDTH.SM};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-x: hidden;
  word-break: break-all;
  min-height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
`;

export const cssLayoutContentStyle = ({
  fixedHeight,
}: {
  fixedHeight?: FixedHeight;
}) => css`
  padding: 16px;
  padding-top: ${(fixedHeight?.header || 0) + 16}px;
  padding-bottom: ${(fixedHeight?.footer || 0) + 16}px;
  min-height: calc(
    var(--vh, 1vh) * 100 - 32px -
      ${fixedHeight?.header ? Math.round(fixedHeight?.header) : 0}px -
      ${fixedHeight?.footer ? Math.round(fixedHeight?.footer) : 0}px
  ); // 헤더와 푸터 높이만큼 뺀 전체 영역을 최소 높이로 가지게 함
`;

export const cssLayoutFixedFooterStyle = css`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: ${WIDTH.SM};
`;

export const cssLayoutFixedHeaderStyle = css`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: ${WIDTH.SM};
`;
