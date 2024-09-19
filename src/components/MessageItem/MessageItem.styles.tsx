import { css, SerializedStyles } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssMessageItemContentStyle = (borderColor: string) => css`
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${borderColor};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 9px;
    left: -10px;
    border-bottom: 10px solid transparent;
    border-right: 10px solid ${borderColor};
  }

  &::after {
    content: "";
    position: absolute;
    top: 10px;
    left: -8px;
    border-bottom: 9px solid transparent;
    border-right: 9px solid white;
  }
`;
