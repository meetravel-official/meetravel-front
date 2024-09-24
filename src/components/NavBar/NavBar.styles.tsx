import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssNavBarStyle = css`
  height: 62px;
  padding: 0 24px;

  border-top: 1px solid ${COLORS.GRAY2};
  border-bottom: 1px solid ${COLORS.GRAY2};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  background: ${COLORS.WHITE};
`;

export const cssNavBarItemStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 56px;
  height: 100%;

  &.active {
    .typography {
      color: ${COLORS.PINK3};
    }
    svg {
      path {
        stroke: ${COLORS.PINK3};
      }
    }
  }
`;
