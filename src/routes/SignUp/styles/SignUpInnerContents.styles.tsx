import { css } from "@emotion/react";

import { cssAlignHorizontalStyle } from "@/styles/align";
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

export const cssFormItemStyle = css`
  width: calc(100% - 2px);
  margin-bottom: 20px;
  transform: translateX(1px);
`;

export const cssDateInputStyle = (width: number) => css`
  all: unset;
  background: transparent;
  color: ${COLORS.GRAY4};
  font-weight: 400;
  font-size: 16px;
  width: ${width}px;
`;

export const cssDateInputBoxStyle = (error?: string) => css`
  width: 100%;
  background: ${COLORS.GRAY1};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 14px;
  &:has(input:focus-visible) {
    outline: ${error
      ? `1.5px solid ${COLORS.SITUATION1}`
      : `1.5px solid ${COLORS.PINK1}`};
  }
`;

export const cssDateInputInnerStyle = css`
  ${cssAlignHorizontalStyle({ gap: 8, alignItems: "center" })};
`;
