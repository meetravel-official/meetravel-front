import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssNavBarStyle = css`
  border-top: 1px solid ${COLORS.GRAY2};
  border-bottom: 1px solid ${COLORS.GRAY2};
  padding: 9px 22px 7px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  background: ${COLORS.WHITE};
`;

export const cssNavBarItemStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-weight: 700;
  font-size: 12px;
  line-height: 14.32px;
  text-align: center;
  padding: 0 22px;
  text-decoration: none;
  color: ${COLORS.GRAY2};
  &.active {
    color: ${COLORS.PINK3};
    svg {
      path {
        stroke: ${COLORS.PINK3};
      }
    }
  }
`;
