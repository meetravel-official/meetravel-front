import { css } from "@emotion/react";

export const cssCalendarContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

export const cssCalendarControlStyle = css`
  display: flex;
  flex-direction: row;
  gap: 38px;
`;

export const cssCalendarControlBtnStyle = css`
  border: none;
  background: none;
  cursor: pointer;
`;

export const cssCalendarStyle = css`
  display: grid;
  grid-template-columns: repeat(7, 28px);
  row-gap: 12px;
  column-gap: 17px;
  justify-items: center;
  align-items: center;
`;
