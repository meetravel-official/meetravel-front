import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssTravelPlanContentTypeBtnBoxStyle = css`
  width: 100%;
`;

export const cssDateSelectBoxStyle = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const cssTravelPlanDateFormItemStyle = (isView: boolean) => css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  display: ${isView ? "box" : "none"};
`;

export const cssInputFullWidthStyle = css`
  width: 100%;
`;

export const cssTravelPlanContentTypeBtnStyle = css`
  background: ${COLORS.WHITE};
  border: 1px solid ${COLORS.GRAY2};
  width: 100%;
  padding: 14px 0;
  height: max-content;
`;
