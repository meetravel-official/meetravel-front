import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssDatePickItemContainerStyle = ({
  isSelected,
  startDay,
  rangeDay,
}: {
  isSelected: boolean;
  startDay: number;
  rangeDay: number;
}) => css`
  background: ${COLORS.GRAY1};
  border-radius: 4px;
  border: ${isSelected ? `1px solid ${COLORS.PINK3}` : COLORS.GRAY1};
  svg {
    path {
      fill: ${isSelected ? COLORS.PINK1 : COLORS.GRAY3};
    }
  }
  width: 100%;
  padding: 0;
  height: 28px;
  cursor: pointer;
  grid-column: ${startDay} / span ${rangeDay};
`;

export const cssDatePickItemInnerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
