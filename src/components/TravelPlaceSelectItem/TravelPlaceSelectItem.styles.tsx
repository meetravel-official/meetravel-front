import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssTravelPlaceSelectItemStyle = css`
  position: relative;

  width: 100%;
  height: 61px;
  border: 1px solid ${COLORS.GRAY2};
  border-radius: 8px;
  overflow: hidden;

  display: flex;
  flex-direction: row;
`;

export const cssTravelPlaceSelectImageStyle = css`
  all: unset;
  cursor: pointer;
`;

export const cssTravelPlaceSelectDescriptionStyle = css`
  all: unset;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  width: calc(100% - 100px - 16px - 54px);
  gap: 16px;

  height: max-content;
  padding: 12px;
  padding-right: 54px;
  border-left: 1px solid ${COLORS.GRAY2};

  .typography {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const cssHeartBtnStyle = (selected?: boolean) => css`
  all: unset;
  cursor: pointer;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 16px;

  width: 22px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 20px;
    path {
      stroke: ${selected ? COLORS.PINK3 : COLORS.GRAY3};
      fill: ${selected ? COLORS.PINK3 : COLORS.WHITE};
    }
  }
`;
