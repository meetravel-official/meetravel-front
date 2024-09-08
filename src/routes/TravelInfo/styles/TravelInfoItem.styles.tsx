import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssTravelInfoItemsStyle = css`
  width: 100%;
  height: auto;

  border: 1px solid ${COLORS.GRAY2};
  border-radius: 8px;

  overflow: hidden;
`;

export const cssTravelInfoItemImageStyle = css`
  position: relative;

  width: 100%;
  aspect-ratio: 328 / 159;
  overflow: hidden;
`;

export const cssTravelInfoItemBtnBoxStyle = css`
  position: absolute;
  top: 19px;
  right: 20px;

  z-index: 2;

  display: flex;
  flex-direction: row;
  gap: 18px;

  .shadow {
    -webkit-filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
  }
`;

export const cssTravelInfoItemHeartStyle = css`
  position: absolute;
  bottom: 12px;
  left: 14.5px;

  z-index: 2;

  background: ${COLORS.PINK3};
  padding: 3px 10px;

  border-radius: 100px;
`;

export const cssTravelInfoItemDescStyle = css`
  padding: 11px 12px;

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const cssTransparentButtonStyle = (padding?: string) => css`
  background: transparent;
  border: none;
  padding: ${padding || "0"};

  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 4px;
`;
