import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssFormItemStyle = css`
  width: calc(100% - 2px);
  margin-bottom: 20px;
  transform: translateX(1px);
`;

export const cssRadioButtonStyle = (isActive: boolean) => css`
  width: 100%;
  height: 48px;
  background-color: ${isActive ? COLORS.GRAY1 : COLORS.GRAY2};
  outline: ${isActive ? `1px solid ${COLORS.PINK3}` : "none"} !important;
  color: ${isActive ? COLORS.PINK3 : COLORS.GRAY3};
  svg {
    path {
      &.fill {
        fill: ${isActive ? COLORS.PINK3 : COLORS.GRAY3};
      }
      &.stroke {
        stroke: ${isActive ? COLORS.PINK3 : COLORS.GRAY3};
      }
    }
    circle {
      fill: ${isActive ? COLORS.PINK3 : COLORS.GRAY3};
    }
  }
`;

export const cssEditProfileImgBoxStyle = css`
  position: relative;

  width: 84px;
  height: 84px;
`;

export const cssEditProfileImgButtonStyle = css`
  all: unset;
  cursor: pointer;

  width: 32px;
  height: 32px;
  position: absolute;
  bottom: 0px;
  right: 0px;

  background: ${COLORS.PINK2};
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const cssPopOverContentStyle = css`
  border: 1px solid ${COLORS.GRAY2};
  background: ${COLORS.WHITE};
  overflow: hidden;
  border-radius: 8px;
  width: 113px;
  z-index: 999;

  button {
    width: 100%;
    padding: 16px 20px;
    :hover {
      background: ${COLORS.GRAY1};
    }
  }
  button:first-of-type {
    border-bottom: 1px solid ${COLORS.GRAY2};
  }
`;

export const cssDisableEditAreaStyle = css`
  opacity: 0.2;
  margin: 32px 0;
  display: flex;
  flex-direction: column
  gap: 24px;
`;
