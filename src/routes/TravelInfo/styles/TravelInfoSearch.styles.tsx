import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssSelectBtnStyle = (width?: number) => css`
  all: unset;

  background: white;
  width: ${width ? `${width}px` : "auto"};
  height: max-content;
  padding: 16px 20px;
  line-height: 100%;

  border: 1px solid ${COLORS.GRAY3};
  border-radius: 8px;

  display: inline-flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  svg {
    transform: rotate(90deg);
  }
`;

export const cssAreaCodeSelectListStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  margin-top: 30px;
`;

export const cssContentTypeSelectListStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 30px;
`;
