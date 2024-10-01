import { css, SerializedStyles } from "@emotion/react";

export const cssHeaderStyle = (detailStyle?: SerializedStyles) => css`
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  background: #fff;
  ${detailStyle}
`;

export const cssHeaderCenterStyle = css`
  width: 100%;
`;
