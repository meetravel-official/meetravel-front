import { css, SerializedStyles } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssStepContainerStyle = css`
  width: 100%;
`;

export const cssStepperStyle = (detailStyle?: SerializedStyles) => css`
  display: flex;
  flex-direction: row;
  gap: 8px;
  ${detailStyle}
`;

export const cssStepDotStyle = ({
  active,
  disabled,
}: {
  active?: boolean;
  disabled: boolean;
}) => css`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${COLORS.GRAY1};
  box-shadow: ${active ? `0 0 0 6px ${COLORS.PINK2} inset` : "none"};
  border: none;
  padding: 0;
  cursor: ${disabled ? "not-allowed" : active ? "default" : "pointer"};
`;

export const cssStepContentStyle = (detailStyle?: SerializedStyles) => css`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${detailStyle}
`;
