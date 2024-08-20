import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

import { InputStyle } from "./Input";

export const cssInputStyle = (inputStyle: InputStyle, error?: string) => css`
  border: ${error ? `1.5px solid ${COLORS.SITUATION1}` : "none"};
  width: ${inputStyle?.width || "328px"};
  height: ${inputStyle?.height || "48px"};
  border-radius: 8px;
  background-color: ${COLORS.GRAY1};
  color: ${COLORS.GRAY5};
  font-size: 16px;
  padding-left: 8px;
  ::placeholder {
    color: ${COLORS.PINK1};
  }
  :focus-visible {
    border: 1px solid ${COLORS.SITUATION2};
  }
`;
