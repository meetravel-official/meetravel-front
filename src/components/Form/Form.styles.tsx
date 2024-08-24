import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

import { ErrorStyle, LabelStyle } from "./FormItem";

export const cssFormItemLabelStyle = (labelStyle?: LabelStyle) => css`
  width: 100%;
  font-size: ${labelStyle?.fontSize || "16px"};
  font-weight: 700;
  line-height: 19.09px;
  text-align: left;
  color: ${COLORS.GRAY3};
  margin-bottom: 10px;
`;

export const cssFormItemErrorStyle = (errorStyle?: ErrorStyle) => css`
  font-size: 14px;
  color: ${COLORS.SITUATION1};
  display: ${errorStyle?.display || "none"};
  margin-top: 8px;
`;

export const cssFormItemStyle = () => css`
  margin-bottom: 8px;
`;
