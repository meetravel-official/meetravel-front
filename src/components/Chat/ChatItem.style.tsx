import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

import { ChatStatus, IChatData } from "./ChatItem";

export const cssMarginRight4px = css`
  margin-right: 4px;
`;

export const cssMarginRight8px = css`
  margin-right: 8px;
`;

export const cssMarginNColor = css`
  color: ${COLORS.GRAY4};
  margin-right: 8px;
`;

export const cssChatItemStyle = (chatData: IChatData) => css`
  width: calc(100% - 40px);
  border: ${chatData.status === ChatStatus.INPROGRESS
    ? `1px solid ${COLORS.PINK3}`
    : chatData.status === ChatStatus.REVIEW
    ? `1px solid ${COLORS.GRAY2}`
    : `1px solid ${COLORS.GRAY3}`};
  background-color: ${chatData.status === ChatStatus.DONE
    ? COLORS.GRAY2
    : COLORS.GRAY1};
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px 0px;
`;

export const cssChatKeywordStyle = (chatData: IChatData) => css`
  outline: ${chatData.isActive
    ? `1px solid ${COLORS.PINK3}`
    : `1px solid ${COLORS.GRAY2}`};
  background-color: ${chatData.status === ChatStatus.DONE
    ? COLORS.GRAY3
    : COLORS.WHITE};
`;

export const cssChatStatusStyle = (chatData: IChatData) => css`
  font-size: 12px;
  font-weight: 400;
  padding: 3px 10px;
  color: ${COLORS.WHITE};
  background-color: ${chatData.isActive ? COLORS.PINK3 : COLORS.SITUATION2};
`;
