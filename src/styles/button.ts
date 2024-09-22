import { css } from "@emotion/react";

export const cssDefaultBtnStyle = ({ width }: { width?: string }) => css`
  all: unset;
  cursor: pointer;
  width: ${width || "auto"};
`;
