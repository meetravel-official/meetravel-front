import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

import { IButtonStyle } from "./Button";

export const cssButtonStyle = ({
  height,
  width,
  bgColor,
  color,
  align,
  disabled,
  detailStyle,
}: IButtonStyle) => css`
  width: ${typeof width === "number" ? `${width}px` : width};
  padding: 16px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: ${align};
  height: ${typeof height === "number" ? `${height}px` : height};
  background-color: ${disabled ? COLORS.GRAY2 : bgColor};
  color: ${disabled ? COLORS.GRAY3 : color};
  border: none;
  border-radius: 8px;
  gap: 8px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    filter: brightness(0.95);
  }
  ${detailStyle}
`;
