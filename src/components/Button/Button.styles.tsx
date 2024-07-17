import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

import { IButtonStyle } from "./Button";

export const cssButtonStyle = ({
  size,
  bgColor,
  color,
  align,
  disabled,
  detailStyle,
}: IButtonStyle) => css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: ${align};
  height: ${size}px;
  background-color: ${disabled ? COLORS.GRAY2 : bgColor};
  color: ${disabled ? COLORS.GRAY3 : color};
  border: none;
  border-radius: 8px;
  gap: 8px;
  ${detailStyle}
`;
