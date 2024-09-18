import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssArrowButtonStyle = ({
  direction,
  disabled,
}: {
  direction: "left" | "right";
  disabled?: boolean;
}) => css`
  all: unset;
  cursor: pointer;

  background: ${COLORS.WHITE};
  border: 1px solid ${disabled ? COLORS.GRAY1 : COLORS.GRAY3};
  border-radius: 8px;
  padding: ${direction === "left"
    ? "14px 19px 14px 17px"
    : "14px 17px 14px 19px"};

  transition-duration: 0.3s;

  svg {
    path {
      stroke: ${disabled ? COLORS.GRAY1 : COLORS.GRAY3};
      transition-duration: 0.3s;
    }
  }
`;
