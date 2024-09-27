import { css } from "@emotion/react";

import { WIDTH } from "@/styles/breakpoint";
import { COLORS } from "@/styles/color";

export const cssCarouselStyle = css`
  width: calc(100% + 32px);
  overflow: hidden;
  position: relative;
`;

export const cssCarouselInnerStyle = (index: number, count: number) => css`
  width: max-content;

  display: flex;
  flex-direction: row;
  gap: 8px;

  transition: all 0.5s;

  transform: translateX(calc(-100% / ${count + 2} * ${index} + 30px));
`;

export const cssCarouselItemStyle = css`
  width: calc(100vw - 60px); //layout padding - 캐러셀 양 옆 살짝 보이게
  max-width: calc(${WIDTH.SM} - 60px); // width가 한없이 커지는 거 방지
  height: auto;
  aspect-ratio: 300 / 176;
  border-radius: 8px;
  border: 1px solid ${COLORS.GRAY2};
  overflow: hidden;
  img {
    object-fit: cover;
  }
`;

export const cssCarouselDotBoxStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 4px;

  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
`;

export const cssCarouselDotStyle = (isActive: boolean) => css`
  width: 8px;
  height: 8px;
  padding: 0;
  background: ${isActive ? COLORS.GRAY1 : "transparent"};
  border: 1px solid ${COLORS.GRAY1};
  border-radius: 50%;
`;
