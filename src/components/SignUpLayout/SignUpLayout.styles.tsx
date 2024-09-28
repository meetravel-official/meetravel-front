import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssSignUpHeaderStyle = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 16px;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid ${COLORS.GRAY1};
`;

export const cssSignUpFooterStyle = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 16px;
  box-sizing: border-box;
  background: #fff;
`;
