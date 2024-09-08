import { css, SerializedStyles } from "@emotion/react";

import { COLORS } from "@/styles/color";

import { ErrorStyle } from "./FormItem";

export const cssFormItemLabelStyle = (labelStyle?: SerializedStyles) => css`
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  line-height: 19.09px;
  text-align: left;
  color: ${COLORS.GRAY3};
  margin-bottom: 10px;
  ${labelStyle};
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
