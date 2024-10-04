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

  position: relative;

  button {
    z-index: 2;
  }
`;

export const cssPreviousDateStyle = css`
  position: absolute;
  top: 50%;
  left: 35.5px;
  transform: translateY(-50%);
`;

export const cssSelectedDateStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition-duration: 1s;
`;

export const cssNextDateStyle = css`
  position: absolute;
  top: 50%;
  right: 35.5px;
  transform: translateY(-50%);
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

export const cssTravelPlaceItemEmptyStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  padding: 30px 0;
`;
