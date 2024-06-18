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
}

export const cssAlignHorizontalStyle = (alignProps: AlignStyleProps) => css`
  display: flex;
  flex-direction: row;
  gap: ${alignProps.gap || 8}px;
  align-items: ${alignProps.alignItems || "center"};
  justify-content: ${alignProps.justifyContent || "flex-start"};
`;

export const cssAlignVerticalStyle = (alignProps: AlignStyleProps) => css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${alignProps.gap || 8}px;
  align-items: ${alignProps.alignItems || "center"};
  justify-content: ${alignProps.justifyContent || "flex-start"};
`;
