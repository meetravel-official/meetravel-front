import { css, SerializedStyles } from "@emotion/react";

import { COLORS } from "@/styles/color";

import { InputStyle } from "./Input";

export const cssInputStyle = css`
  outline: none;
  border: none;
  width: 100%;
  border-radius: 8px;
  font-size: 16px;
  flex-grow: 1;
  padding-left: 8px;
  background-color: inherit;
  ::placeholder {
    color: ${COLORS.PINK1};
  }
`;

export const cssInputIconStyle = (inputStyle: InputStyle) => css`
  padding: 8px 8px 0 8px;
  width: fit-content;
  height: ${inputStyle?.height || "48px"};
`;

export const cssInputWrapperStyle = (
  inputStyle: InputStyle,
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
