import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssAgreetoTermsStyle = css`
  min-height: inherit;
  height: 100%;
  margin-bottom: 50px;
`;

export const cssTermBtnBoxStyle = css`
  width: 100%;
  position: relative;
`;

export const cssTermCheckboxStyle = css`
  position: absolute;
  top: 14px;
  left: 16px;
  z-index: 2;
`;

export const cssTermBtnStyle = css`
  padding-left: 44px;
`;

export const cssRadioButtonStyle = (isActive: boolean) => css`
  width: 100%;
  height: 48px;
  background-color: ${isActive ? COLORS.GRAY1 : COLORS.GRAY2};
  outline: ${isActive ? `1px solid ${COLORS.PINK3}` : "none"} !important;
  color: ${isActive ? COLORS.PINK3 : COLORS.GRAY3};
`;
