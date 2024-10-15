import { css, SerializedStyles } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssInputStyle = (inputDetailStyle?: SerializedStyles) => css`
  all: unset;

  outline: none;
  border: none;
  width: 100%;
  border-radius: 8px;
  font-size: 16px;
  flex-grow: 1;
  padding: 0 8px;
  background-color: inherit;
  ::placeholder {
    color: ${COLORS.PINK1};
  }
  ${inputDetailStyle}
`;

export const cssInputIconStyle = css`
  margin: auto;
  padding-right: 16px;
  width: fit-content;
  height: fit-content;
`;

export const cssInputWrapperStyle = (
  error?: string,
  detailStyle?: SerializedStyles
) => css`
  position: relative;
  outline: ${error ? `1.5px solid ${COLORS.SITUATION1}` : "none"};
  border: none;
  width: 328px;
  height: 48px;
  border-radius: 8px;
  background-color: ${COLORS.GRAY1};
  color: ${COLORS.GRAY5};
  display: flex;
  &:has(input:focus-visible) {
    outline: ${error
      ? `1.5px solid ${COLORS.SITUATION1}`
      : `1.5px solid ${COLORS.PINK1}`};
  }
  ${detailStyle}
`;
