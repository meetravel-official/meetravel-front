import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssBackHeaderPrefixStyle = css`
  all: unset;
  position: fixed;
  top: 0;
  height: 75px;
  align-items: center;
  display: flex;
  gap: 16px;
  background-color: white;
  z-index: 1;
  width: 100%;
  margin: 0 16px 0 -16px;
  padding: 0 16px;
  max-width: 540px;
  box-sizing: border-box;
`;

export const cssMessageListStyle = css`
  box-sizing: border-box;
  height: calc(var(--vh, 1vh) * 100 - 165px - 40px);
  overflow-y: auto;
  background-color: ${COLORS.GRAY1};
  margin: 60px -16px 0 -16px;
  padding: 16px 16px 0 16px;
  gap: 8px;
  display: flex;
  flex-direction: column;
`;

export const cssChatRoomInputWrapperStyle = css`
  height: 62px;
  display: flex;
  position: fixed;
  gap: 8px;
  width: 100%;
  max-width: 540px;
  margin: 0 -16px;
  background-color: ${COLORS.WHITE};
  border-top: 1px solid ${COLORS.GRAY2};
`;

export const cssChatRoomInputStyle = css`
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.GRAY2};
  height: 46px;
  margin: 8px 0;
  width: 100%;
`;

export const cssChatRoomKeywordStyle = css`
  outline: 1px solid ${COLORS.GRAY2};
  background-color: ${COLORS.WHITE};
  box-shadow: 0 0 12px 0px #00000040;
`;
