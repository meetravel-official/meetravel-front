import { css } from "@emotion/react";

import { ChatStatus, IChatData } from "@/api/interfaces/chat";
import { COLORS } from "@/styles/color";

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
  border: ${chatData.isActive
    ? `1px solid ${COLORS.PINK3}`
    : chatData.status === ChatStatus.INPROGRESS ||
      chatData.status === ChatStatus.REVIEW
    ? `1px solid ${COLORS.GRAY2}`
    : `1px solid ${COLORS.GRAY3}`};
  background-color: ${chatData.status === ChatStatus.DONE
    ? COLORS.GRAY2
    : COLORS.GRAY1};
  border-radius: 8px;
  padding: 16px 20px;
`;

export const cssChatKeywordStyle = (chatData: IChatData) => css`
  outline: ${chatData.isActive
    ? `1px solid ${COLORS.PINK3}`
    : `1px solid ${COLORS.GRAY2}`};
  background-color: ${chatData.status === ChatStatus.DONE
    ? COLORS.GRAY3
    : COLORS.WHITE};
  width: max-content;
`;

export const cssChatStatusStyle = (chatData: IChatData) => css`
  font-size: 12px;
  font-weight: 400;
  padding: 3px 10px;
  color: ${COLORS.WHITE};
  background-color: ${chatData.isActive ? COLORS.PINK3 : COLORS.SITUATION2};
`;
