import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssSearchInputWrapperStyle = ({
  borderColor,
}: {
  borderColor?: string;
}) => css`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 16.5px 16px;
  background-color: ${COLORS.WHITE};

  border: 1px solid ${borderColor};
  &:has(input:focus-visible) {
    border: 1px solid ${COLORS.PINK3};
  }
  border-radius: 8px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

export const cssInputStyle = ({
  placeholderColor,
  color,
}: {
  placeholderColor?: string;
  color?: string;
}) => css`
  all: unset;
  width: 100%;
  background: transparent;

  color: ${color};
  ::placeholder {
    color: ${placeholderColor};
  }

  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const cssInputIconStyle = css`
  all: unset;
  cursor: pointer;

  width: 20px;
  height: 20px;
`;
