import { css } from "@emotion/react";

interface AlignStyleProps {
  gap?: number;
  alignItems?:
    | "center"
    | "space-between"
    | "space-around"
    | "flex-start"
    | "flex-end";
  justifyContent?:
    | "center"
    | "space-between"
    | "space-around"
    | "flex-start"
    | "flex-end";
  width?: string;
  wrap?: "wrap" | "nowrap";
}

export const cssAlignHorizontalStyle = (alignProps: AlignStyleProps) => css`
  display: flex;
  flex-direction: row;
  gap: ${alignProps.gap || 8}px;
  align-items: ${alignProps.alignItems || "center"};
  justify-content: ${alignProps.justifyContent || "flex-start"};
  width: ${alignProps.width || "auto"};
  flex-wrap: ${alignProps.wrap || "nowrap"};
`;

export const cssAlignVerticalStyle = (alignProps: AlignStyleProps) => css`
  width: ${alignProps.width || "100%"};
  display: flex;
  flex-direction: column;
  gap: ${typeof alignProps.gap === "number" ? alignProps.gap : 8}px;
  align-items: ${alignProps.alignItems || "center"};
  justify-content: ${alignProps.justifyContent || "flex-start"};
  flex-wrap: ${alignProps.wrap || "nowrap"};
`;
