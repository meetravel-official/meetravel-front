import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssUserAvatarBoxStyle = (size?: number) => css`
  width: ${size || 40}px;
  height: auto;
  aspect-ratio: 1/1;
  border-radius: 8px;
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.GRAY2};
  overflow: hidden;
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
