import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssCheckboxStyle = css`
  .checkbox-root {
    background-color: ${COLORS.GRAY2};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .checkbox-indicator {
    color: ${COLORS.WHITE};
    display: flex;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;
