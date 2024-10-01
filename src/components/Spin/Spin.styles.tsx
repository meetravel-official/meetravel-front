import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

import { SpinProps } from "./Spin";

export const cssSpinStyle = ({ size, color }: SpinProps) => css`
  width: ${size || 16}px;
  height: ${size || 16}px;
  border-radius: 50%;
  border: none;
  background: transparent;
  border-top: 2px solid ${color || COLORS.GRAY2};

  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
